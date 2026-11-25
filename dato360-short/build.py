#!/usr/bin/env python3
"""Dato360 · Short «Gran Biobúsqueda del Sur — Montevideo» (1080x1920, 28 s).

Uso:  python3 build.py            -> genera entregables/ (MP4 con y sin subtítulos, SRT)
Requiere: ffmpeg, Pillow. Todo el montaje está parametrizado por CUES / SCENES:
si luego agregás la narración, ajustá esos tiempos y volvé a correr.
Si existe assets/logo_dato360.png se usa como cierre; si no, wordmark provisional.
"""
import os, subprocess, sys, shutil
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance

HERE = os.path.dirname(os.path.abspath(__file__))
PH = os.path.join(HERE, "assets", "photos")
OUT = os.path.join(HERE, "entregables")
TMP = os.path.join(HERE, ".build")
os.makedirs(OUT, exist_ok=True); shutil.rmtree(TMP, ignore_errors=True); os.makedirs(TMP)

W, H, FPS, TOTAL = 1080, 1920, 30, 28.0
FONT = "/usr/share/fonts/opentype/inter/Inter-%s.otf"
def F(w, s): return ImageFont.truetype(FONT % w, s)
AMBER, WHITE, TEAL = (255, 201, 60), (255, 255, 255), (8, 34, 31)

# ---------------- tiempos (segundos) ----------------
# Cada cue = (inicio, fin, texto). Ritmo estimado de locución rioplatense (~2,8 palabras/s).
CUES = [
    (0.4, 1.6, "¿Sabías que una foto"), (1.6, 3.0, "de un bicho puede ayudar"),
    (3.0, 4.6, "a conocer la biodiversidad"), (4.6, 6.3, "de Montevideo, Uruguay?"),
    (6.8, 9.0, "Del 27 al 30 de noviembre,"), (9.0, 10.3, "sacale una foto"),
    (10.3, 12.9, "a un insecto o a un ave silvestre"), (12.9, 14.4, "y subila a iNaturalist"),
    (14.4, 16.0, "con la fecha y el lugar."),
    (16.5, 18.2, "¿No sabés qué especie es?"), (18.3, 20.2, "La comunidad te puede ayudar."),
    (20.7, 22.4, "Buscá “GBS 2026 Montevideo”"), (22.4, 23.3, "y sumate."),
]
B = [0.0, 6.8, 16.5, 20.5]                 # inicio de cada escena
END_CARD = 25.0                            # entra el cierre con logo
XF = 0.3                                   # crossfade entre escenas
STEPS_AT = [9.0, 12.2, 14.0]               # aparición de los 3 pasos
SCENES = [  # foto, centro x del recorte (0-1), oscurecer, blur, crédito
    ("191380813.jpg", 0.47, 0.88, 0, "Foto: Mike Dickison · CC BY · iNaturalist"),
    ("40865772.jpg", 0.45, 0.64, 2.0, "Foto: Joselin Listur · CC BY · iNaturalist"),
    ("249587392.jpg", 0.55, 0.48, 2.0, "Foto: Julia Elissalde · CC0 · iNaturalist"),
    ("348511005.jpg", 0.47, 0.55, 1.5, "Foto: Milagros Valverde · CC BY · iNaturalist"),
]

# ---------------- utilidades de dibujo ----------------
def canvas(w=W, h=H): return Image.new("RGBA", (w, h), (0, 0, 0, 0))
def rrect(d, box, r, fill): d.rounded_rectangle(box, r, fill=fill)
def center_text(d, y, text, font, fill=WHITE, stroke=0, sc=(0, 0, 0), cx=W // 2):
    w = d.textlength(text, font=font)
    d.text((cx - w / 2, y), text, font=font, fill=fill, stroke_width=stroke, stroke_fill=sc)
    return w
def shadowed(img, blur=10, alpha=0.55):
    a = img.split()[3].filter(ImageFilter.GaussianBlur(blur)).point(lambda v: int(v * alpha))
    sh = Image.new("RGBA", img.size, (0, 0, 0, 0)); sh.putalpha(a)
    out = Image.new("RGBA", img.size, (0, 0, 0, 0)); out.alpha_composite(sh, (0, 6)); out.alpha_composite(img)
    return out

def ss(fn, size, col=WHITE, S=4):
    """Dibuja un ícono a S× y reduce (antialias)."""
    im = Image.new("RGBA", (size * S, size * S), (0, 0, 0, 0)); d = ImageDraw.Draw(im); fn(d, size * S, col)
    return im.resize((size, size), Image.LANCZOS)
def ic_camera(d, s, c):
    d.rounded_rectangle((s*.08, s*.28, s*.92, s*.84), s*.12, fill=c)
    d.rounded_rectangle((s*.30, s*.16, s*.52, s*.32), s*.05, fill=c)
    d.ellipse((s*.31, s*.37, s*.69, s*.75), fill=TEAL); d.ellipse((s*.38, s*.44, s*.62, s*.68), fill=c)
def ic_calpin(d, s, c):
    d.rounded_rectangle((s*.06, s*.14, s*.74, s*.80), s*.08, fill=c)
    d.rectangle((s*.06, s*.14, s*.74, s*.32), fill=AMBER)
    for x in (.20, .58): d.rounded_rectangle((s*x, s*.04, s*(x+.06), s*.22), s*.03, fill=c)
    for i in range(3):
        for j in range(2): d.rounded_rectangle((s*(.14+i*.19), s*(.42+j*.18), s*(.24+i*.19), s*(.52+j*.18)), s*.02, fill=TEAL)
    d.ellipse((s*.58, s*.50, s*.94, s*.86), fill=AMBER, outline=TEAL, width=int(s*.03))
    d.polygon([(s*.62, s*.78), (s*.90, s*.78), (s*.76, s*1.0)], fill=AMBER)
    d.ellipse((s*.70, s*.62, s*.82, s*.74), fill=TEAL)
def ic_upload(d, s, c):
    d.ellipse((s*.06, s*.38, s*.46, s*.78), fill=c); d.ellipse((s*.26, s*.20, s*.72, s*.70), fill=c)
    d.ellipse((s*.56, s*.36, s*.94, s*.76), fill=c); d.rectangle((s*.26, s*.50, s*.75, s*.78), fill=c)
    d.polygon([(s*.5, s*.30), (s*.27, s*.56), (s*.43, s*.56), (s*.43, s*.92), (s*.57, s*.92), (s*.57, s*.56), (s*.73, s*.56)], fill=TEAL)
def ic_people(d, s, c):
    for cx, r, y in ((.5, .17, .22), (.18, .12, .36), (.82, .12, .36)):
        d.ellipse((s*(cx-r), s*y, s*(cx+r), s*(y+2*r)), fill=c)
    d.pieslice((s*.28, s*.55, s*.72, s*1.15), 180, 360, fill=c)
    d.pieslice((s*-.08, s*.62, s*.36, s*1.1), 180, 360, fill=c); d.pieslice((s*.64, s*.62, s*1.08, s*1.1), 180, 360, fill=c)
def ic_search(d, s, c):
    d.ellipse((s*.10, s*.10, s*.62, s*.62), outline=c, width=int(s*.10))
    d.line((s*.55, s*.55, s*.90, s*.90), fill=c, width=int(s*.12))
def ic_pin(d, s, c):
    d.ellipse((s*.18, s*.04, s*.82, s*.64), fill=c); d.polygon([(s*.24, s*.5), (s*.76, s*.5), (s*.5, s*.98)], fill=c)
    d.ellipse((s*.38, s*.24, s*.62, s*.48), fill=TEAL)

def save(im, name):
    p = os.path.join(TMP, name); im.save(p); return p

# ---------------- fondos ----------------
def make_bg(i, fn, cx, dark, blur):
    im = Image.open(os.path.join(PH, fn)).convert("RGB")
    cw = int(im.height * 9 / 16); cw = min(cw, im.width)
    ch = int(cw * 16 / 9)
    x0 = max(0, min(im.width - cw, int(im.width * cx - cw / 2))); y0 = max(0, (im.height - ch) // 2)
    im = im.crop((x0, y0, x0 + cw, y0 + ch)).resize((2160, 3840), Image.LANCZOS)
    if blur: im = im.filter(ImageFilter.GaussianBlur(blur * 2))
    im = ImageEnhance.Brightness(im).enhance(dark if i else 1.0)
    # viñeta inferior para legibilidad de subtítulos
    g = Image.linear_gradient("L").resize((2160, 3840)).point(lambda v: int(max(0, v - 90) * 0.9))
    black = Image.new("RGB", im.size, (0, 12, 10)); im = Image.composite(black, im, g)
    if i == 0:  # franja superior suave bajo la etiqueta
        g2 = Image.linear_gradient("L").transpose(Image.FLIP_TOP_BOTTOM).resize((2160, 3840)).point(lambda v: int(max(0, v - 150) * 0.8))
        im = Image.composite(black, im, g2)
    return save(im, f"bg{i}.jpg")

# ---------------- overlays ----------------
def tag_overlay():
    c = canvas(); d = ImageDraw.Draw(c); t = "MONTEVIDEO, URUGUAY"; f = F("ExtraBold", 46)
    w = d.textlength(t, font=f); pw = w + 150; x0 = (W - pw) / 2
    rrect(d, (x0, 250, x0 + pw, 340), 45, (8, 34, 31, 215))
    c.alpha_composite(ss(ic_pin, 54, AMBER), (int(x0 + 34), 268))
    d.text((x0 + 105, 264), t, font=f, fill=WHITE)
    return save(c, "tag.png")
def date_overlay(small=False):
    c = canvas(); d = ImageDraw.Draw(c)
    f = F("Black", 64 if small else 104); y = 395 if not small else 385
    center_text(d, y, "27–30 NOV 2026", f, AMBER, 0)
    return save(shadowed(c, 10, .7), "date_s.png" if small else "date.png")
def step_card(n, text, icon):
    c = canvas(900, 170); d = ImageDraw.Draw(c)
    rrect(d, (0, 0, 900, 170), 40, (8, 34, 31, 225))
    d.ellipse((34, 45, 114, 125), fill=AMBER); center_text(d, 50, str(n), F("Black", 56), TEAL, cx=74)
    c.alpha_composite(ss(icon, 92), (140, 39))
    d.text((262, 52), text, font=F("ExtraBold", 50), fill=WHITE)
    return save(shadowed(c, 8, .5), f"step{n}.png")
def text_block(name, lines, size, y, col=WHITE, stroke=8, weight="Black", gap=1.12):
    c = canvas(); d = ImageDraw.Draw(c); f = F(weight, size)
    for k, ln in enumerate(lines): center_text(d, y + k * int(size * gap), ln, f, col, stroke, (6, 24, 22))
    return save(shadowed(c, 8, .6), name)
def community_card():
    c = canvas(900, 170); d = ImageDraw.Draw(c); rrect(d, (0, 0, 900, 170), 40, (8, 34, 31, 225))
    c.alpha_composite(ss(ic_people, 110, AMBER), (36, 30))
    d.text((180, 28), "La comunidad", font=F("ExtraBold", 56), fill=AMBER)
    d.text((180, 94), "te puede ayudar", font=F("ExtraBold", 52), fill=WHITE)
    return save(shadowed(c, 8, .5), "community.png")
def search_pill(name="search.png", y=0):
    c = canvas(900, 230); d = ImageDraw.Draw(c); rrect(d, (0, 0, 900, 230), 50, (8, 34, 31, 235))
    c.alpha_composite(ss(ic_search, 96, AMBER), (44, 67))
    d.text((176, 30), "Buscá:", font=F("Bold", 42), fill=AMBER)
    d.text((176, 86), "GBS 2026 Montevideo", font=F("Black", 62), fill=WHITE)
    return save(shadowed(c, 8, .5), name)
def question():
    return text_block("question.png", ["¿Qué bicho viste", "en tu barrio?"], 84, 880, WHITE, 9)
def credit(i, text):
    c = canvas(); d = ImageDraw.Draw(c); f = F("SemiBold", 27)
    w = d.textlength(text, font=f); d.text((W / 2 - w / 2 - 20, 1492), text, font=f, fill=(255, 255, 255, 235), stroke_width=4, stroke_fill=(0, 0, 0, 255))
    return save(c, f"credit{i}.png")
def end_card():
    c = Image.new("RGBA", (W, H)); g = Image.linear_gradient("L").resize((W, H))
    top, bot = Image.new("RGB", (W, H), (9, 52, 46)), Image.new("RGB", (W, H), (3, 16, 15))
    c = Image.composite(bot, top, g).convert("RGBA"); d = ImageDraw.Draw(c)
    center_text(d, 395, "27–30 NOV 2026", F("Black", 64), AMBER)
    sp = Image.open(search_pill()); c.alpha_composite(sp, (90, 520))
    qy = Image.open(os.path.join(TMP, "question.png")); c.alpha_composite(qy, (0, -70))
    logo = os.path.join(HERE, "assets", "logo_dato360.png")
    if os.path.exists(logo):
        lg = Image.open(logo).convert("RGBA"); lg.thumbnail((760, 300)); c.alpha_composite(lg, ((W - lg.width) // 2, 1120))
    else:
        f = F("Black", 190); a, b = "Dato", "360"; wa, wb = d.textlength(a, font=f), d.textlength(b, font=f)
        x = (W - wa - wb) / 2; d.text((x, 1110), a, font=f, fill=WHITE); d.text((x + wa, 1110), b, font=f, fill=AMBER)
    ft = F("SemiBold", 26)
    for k, t in enumerate(["Fotos: Mike Dickison, Joselin Listur, Julia Elissalde y Milagros Valverde", "vía iNaturalist · CC BY / CC0 · Detalle de licencias en la descripción"]):
        center_text(d, 1470 + k * 36, t, ft, (255, 255, 255, 200))
    return save(c, "endcard.png")

SUB_FONT = F("ExtraBold", 68)
def sub_png(i, text):
    d0 = ImageDraw.Draw(Image.new("RGBA", (10, 10))); words, lines, cur = text.split(), [], ""
    for w in words:
        t = (cur + " " + w).strip()
        if d0.textlength(t, font=SUB_FONT) <= 800: cur = t
        else: lines.append(cur); cur = w
    lines.append(cur); lh = 84; h = lh * len(lines) + 30
    c = canvas(W, h); d = ImageDraw.Draw(c)
    for k, ln in enumerate(lines): center_text(d, 8 + k * lh, ln, SUB_FONT, WHITE, 9, (0, 0, 0), cx=W // 2 - 20)
    return save(c, f"sub{i}.png"), h

# ---------------- ensamblado ffmpeg ----------------
def srt_time(t): ms = int(round(t * 1000)); return f"{ms//3600000:02}:{ms//60000%60:02}:{ms//1000%60:02},{ms%1000:03}"
def write_srt(path):
    with open(path, "w", encoding="utf-8") as f:
        for i, (a, b, t) in enumerate(CUES, 1): f.write(f"{i}\n{srt_time(a)} --> {srt_time(b)}\n{t}\n\n")

class G:
    def __init__(s): s.inputs, s.chains, s.last, s.n = [], [], None, 0
    def inp(s, args, path): s.inputs += args + ["-i", path]; s.n += 1; return s.n - 1
    def overlay(s, path, start, end, fade_in=0.0, fade_out=0.0, x="0", y="0", still=True):
        k = s.inp(["-loop", "1", "-framerate", str(FPS), "-t", f"{end - start + 0.1:.3f}"], path)
        f = f"[{k}:v]format=rgba,setpts=PTS+{start}/TB"
        if fade_in: f += f",fade=t=in:st={start}:d={fade_in}:alpha=1"
        if fade_out: f += f",fade=t=out:st={end - fade_out}:d={fade_out}:alpha=1"
        o = f"o{k}"; s.chains.append(f + f"[{o}]")
        nxt = f"v{k}"
        s.chains.append(f"[{s.last}][{o}]overlay=x='{x}':y='{y}':eof_action=pass:enable='gte(t,{start})*lt(t,{end})'[{nxt}]"); s.last = nxt

def render(subs, outname):
    g = G(); bgs = [make_bg(i, *a[:4]) for i, a in enumerate(SCENES)]
    ends = B[1:] + [TOTAL]; n = len(bgs)
    for i, p in enumerate(bgs):
        d = ends[i] - B[i] + (XF if i < n - 1 else 0)
        # el último clip dura TOTAL-B[-1]; los demás llevan XF extra para el crossfade
        if i == n - 1: d = TOTAL - B[i]
        N = int(round(d * FPS)); k = g.inp([], p)
        zi, zf = (1.0, 1.12) if i % 2 == 0 else (1.12, 1.0)
        g.chains.append(f"[{k}:v]zoompan=z='{zi}+({zf}-{zi})*on/{N}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d={N}:s={W}x{H}:fps={FPS},format=yuv420p,setsar=1[s{i}]")
    cur = "s0"
    for i in range(1, n):
        g.chains.append(f"[{cur}][s{i}]xfade=transition=fade:duration={XF}:offset={B[i]}[x{i}]"); cur = f"x{i}"
    g.last = cur
    # gráficos fijos
    g.overlay(tag_overlay(), 0, TOTAL)
    for i, a in enumerate(SCENES):
        e = (END_CARD if i == n - 1 else B[i + 1]); g.overlay(credit(i, a[4]), B[i] + (0.3 if i else 0), e, 0, 0.2 if i < n - 1 else 0)
    g.overlay(date_overlay(), B[1] + 0.1, B[2], 0.3, 0.25, y="0+30*max(0,1-(t-%s)/0.3)" % (B[1] + 0.1))
    for k, (name, ic) in enumerate([("Sacá la foto", ic_camera), ("Agregá fecha y lugar", ic_calpin), ("Subila a iNaturalist", ic_upload)]):
        a = STEPS_AT[k]; g.overlay(step_card(k + 1, name, ic), a, B[2], 0.3, 0.25, x="90", y="%d+50*max(0,1-(t-%s)/0.3)" % (560 + k * 210, a))
    g.overlay(text_block("q1.png", ["¿No sabés qué", "especie es?"], 92, 560), B[2] + 0.1, END_CARD if False else B[3], 0.3, 0.25)
    g.overlay(community_card(), 18.3, B[3], 0.3, 0.25, x="90", y="880+40*max(0,1-(t-18.3)/0.3)")
    g.overlay(search_pill(), 20.7, END_CARD, 0.3, 0, x="90", y="520+40*max(0,1-(t-20.7)/0.3)")
    question(); g.overlay(os.path.join(TMP, "question.png"), 22.4, END_CARD, 0.3, 0, y="-70+30*max(0,1-(t-22.4)/0.3)")
    g.overlay(end_card(), END_CARD, TOTAL, 0.5, 0)
    g.overlay(tag_overlay(), END_CARD, TOTAL)       # la etiqueta queda por encima del cierre
    if subs:
        for i, (a, b, t) in enumerate(CUES):
            p, h = sub_png(i, t); g.overlay(p, a, b, 0, 0, y=str(1445 - h))
    fc = os.path.join(TMP, "graph.txt"); open(fc, "w").write(";\n".join(g.chains))
    a = g.n; out = os.path.join(OUT, outname)
    cmd = ["ffmpeg", "-y", "-hide_banner", "-loglevel", "error"] + g.inputs + ["-f", "lavfi", "-t", str(TOTAL), "-i", "anullsrc=r=48000:cl=stereo",
           "-filter_complex_script", fc, "-map", f"[{g.last}]", "-map", f"{a}:a", "-t", str(TOTAL), "-r", str(FPS),
           "-c:v", "libx264", "-preset", "slow", "-crf", "17", "-pix_fmt", "yuv420p", "-profile:v", "high", "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709",
           "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart", out]
    subprocess.run(cmd, check=True); print("OK", out)

if __name__ == "__main__":
    write_srt(os.path.join(OUT, "dato360_gbs_montevideo_short.srt"))
    render(False, "dato360_gbs_montevideo_short_sin_subtitulos.mp4")
    render(True, "dato360_gbs_montevideo_short_con_subtitulos.mp4")
