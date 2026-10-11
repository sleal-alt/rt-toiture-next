import base64, re, warnings
warnings.filterwarnings('ignore')
from numbers_parser import Document

def to_pos(s):
    if not s: return None
    s = str(s).strip()
    if s in ("", "—", "À vérifier", "A verifier", "N’apparaît pas", "N‘apparaît pas",
             "Absent", "En cours d’indexation"): return None
    m = re.search(r'Page\s*(\d+)\s*#(\d+)', s)
    if m: return (int(m.group(1))-1)*10 + int(m.group(2))
    m = re.search(r'#?(\d+)', s)
    if m: return int(m.group(1))
    return None

def load_nb(path):
    doc = Document(path)
    rows = {}
    for sheet in doc.sheets:
        for table in sheet.tables:
            for i, row in enumerate(table.iter_rows()):
                if i == 0: continue
                vals = [str(c.value).strip() if c.value is not None else "" for c in row]
                if vals[0]: rows[vals[0]] = vals
    return rows

jul = load_nb("/Users/Steve/Downloads/bilan_seo_rt_toiture74 (juillet).numbers")
aou = load_nb("/Users/Steve/Downloads/bilan_seo_rt_toiture74 (Aout).numbers")

COMMUNES = [
    "couvreur Vétraz-Monthoux","couvreur Annemasse","couvreur Bonne",
    "couvreur Sciez","couvreur Collonges-sous-Salève","couvreur Chamonix-Mont-Blanc",
    "couvreur Bonneville","couvreur Cluses","couvreur Saint-Julien-en-Genevois",
    "couvreur Douvaine","couvreur Bons-en-Chablais","couvreur Saint-Cergues",
    "couvreur Veigy-Foncenex","couvreur Annecy","couvreur Veyrier-du-Lac",
    "couvreur Menthon-Saint-Bernard","couvreur Talloires","couvreur Bossey",
    "couvreur Megève","couvreur Sallanches","couvreur La Roche-sur-Foron",
    "couvreur Reignier-Ésery","couvreur Viuz-en-Sallaz","couvreur Chens-sur-Léman",
    "couvreur Yvoire","couvreur Messery","couvreur Poisy","couvreur Épagny-Metz-Tessy",
]

data = []
for c in COMMUNES:
    j = jul.get(c, [""] * 7)
    a = aou.get(c, [""] * 7)
    seo_j   = to_pos(j[1] if len(j) > 1 else "")
    maps_j  = to_pos(j[2] if len(j) > 2 else "")
    seo_a   = to_pos(a[1] if len(a) > 1 else "")
    maps_a  = to_pos(a[2] if len(a) > 2 else "")
    evo_seo  = (seo_j - seo_a) if (seo_j and seo_a) else None
    evo_maps = (maps_j - maps_a) if (maps_j and maps_a) else None
    raw_j1 = j[1] if len(j) > 1 else ""
    raw_a1 = a[1] if len(a) > 1 else ""
    data.append({
        "commune": c.replace("couvreur ", ""),
        "seo_j": seo_j, "maps_j": maps_j,
        "seo_a": seo_a, "maps_a": maps_a,
        "evo_seo": evo_seo, "evo_maps": evo_maps,
        "raw_j": raw_j1, "raw_a": raw_a1,
    })

with open('/Users/Steve/Downloads/renk-word-dark.png', 'rb') as f:
    LOGO_B64 = base64.b64encode(f.read()).decode()

def pos_label(p, raw=""):
    if p is None:
        if "Absent" in raw: return "Absent"
        if "cours" in raw: return "En cours"
        return "—"
    if p <= 10: return f"Page 1 #{p}"
    if p <= 20: return f"Page 2 #{p-10}"
    if p <= 30: return f"Page 3 #{p-20}"
    if p <= 60: return f"Page {(p-1)//10+1} #{p%10 or 10}"
    return f"Page {(p-1)//10+1} #{p%10 or 10}"

def seo_tier(p):
    if p is None: return "absent"
    if p <= 10: return "p1"
    if p <= 20: return "p2"
    if p <= 60: return "p36"
    return "p7"

def evo_html(e, label=""):
    if e is None: return '<span class="na">—</span>'
    if e > 0: return f'<span class="gain">+{e}</span>'
    if e < 0: return f'<span class="loss">{e}</span>'
    return f'<span class="stable">→</span>'

# Build rows
page1_rows = [d for d in data if d["seo_a"] and d["seo_a"] <= 10]
page2_rows = [d for d in data if d["seo_a"] and 11 <= d["seo_a"] <= 20]
page3_6_rows = [d for d in data if d["seo_a"] and 21 <= d["seo_a"] <= 60]
page7_rows = [d for d in data if d["seo_a"] and d["seo_a"] > 60]
absent_rows = [d for d in data if not d["seo_a"]]

def render_section(title, dot_class, rows):
    html = f'<tr class="section-header"><td colspan="8"><span class="dot {dot_class}"></span>{title}</td></tr>\n'
    for d in rows:
        ia = " ✦ <small>Aperçu IA</small>" if "aperçu" in d["raw_a"].lower() else ""
        html += f"""<tr>
  <td class="commune">{d["commune"]}{ia}</td>
  <td class="pos {seo_tier(d['seo_j'])}">{pos_label(d['seo_j'], d['raw_j'])}</td>
  <td class="maps-pos">{f"#{d['maps_j']}" if d['maps_j'] else '—'}</td>
  <td class="pos {seo_tier(d['seo_a'])}">{pos_label(d['seo_a'], d['raw_a'])}</td>
  <td class="maps-pos">{f"#{d['maps_a']}" if d['maps_a'] else '—'}</td>
  <td class="evo-cell">{evo_html(d['evo_seo'])}</td>
  <td class="evo-cell">{evo_html(d['evo_maps'])}</td>
</tr>\n"""
    return html

TABLE_ROWS = (
    render_section("● PAGE 1 — VISIBLE MAINTENANT", "p1", sorted(page1_rows, key=lambda x: x["seo_a"])) +
    render_section("● PAGE 2 — À QUELQUES POSITIONS DE LA PAGE 1", "p2", sorted(page2_rows, key=lambda x: x["seo_a"])) +
    render_section("● PAGES 3–6 — EN PROGRESSION", "p36", sorted(page3_6_rows, key=lambda x: x["seo_a"])) +
    render_section("● PAGES 7+ — TRAVAIL DE MONTÉE EN COURS", "p7", sorted(page7_rows, key=lambda x: x["seo_a"])) +
    render_section("● GBP / HORS CLASSEMENT SEO", "absent", absent_rows)
)

prog = sum(1 for d in data if d["evo_seo"] and d["evo_seo"] > 0)
recul = sum(1 for d in data if d["evo_seo"] and d["evo_seo"] < 0)
total_gain = sum(d["evo_seo"] for d in data if d["evo_seo"] and d["evo_seo"] > 0)
n_p1 = len(page1_rows)
n_p2 = len(page2_rows)
n_p36 = len(page3_6_rows)
n_p7plus = len(page7_rows) + len(absent_rows)
gbp_pos = sum(1 for d in data if d["maps_a"])

HTML = f"""<title>Rapport SEO RT Toiture 74</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=DM+Mono:wght@400;500&display=swap">

<style>
/* ── Tokens ─────────────────────────────────────── */
:root {{
  --navy:    #0D2340;
  --navy-80: #1B3D6B;
  --blue:    #1D4ED8;
  --ink:     #111827;
  --ink-60:  #4B5563;
  --ink-30:  #9CA3AF;
  --rule:    #E5E7EB;
  --bg:      #FFFFFF;
  --bg2:     #F9FAFB;

  --p1-bg:   #DCFCE7; --p1-tx: #14532D;
  --p2-bg:   #DBEAFE; --p2-tx: #1E3A8A;
  --p36-bg:  #FEF9C3; --p36-tx: #713F12;
  --p7-bg:   #FFE4E6; --p7-tx: #9F1239;
  --ab-bg:   #F3F4F6; --ab-tx: #374151;

  --gain-bg:  #DCFCE7; --gain-tx: #15803D;
  --loss-bg:  #FEE2E2; --loss-tx: #B91C1C;
  --stable-tx:#6B7280;

  font-size: 14px;
  font-family: 'DM Sans', system-ui, sans-serif;
  color: var(--ink);
  background: var(--bg);
}}
@media (prefers-color-scheme: dark) {{
  :root:not([data-theme="light"]) {{
    --navy:    #0D2340;
    --bg:      #111827;
    --bg2:     #1F2937;
    --ink:     #F9FAFB;
    --ink-60:  #D1D5DB;
    --ink-30:  #6B7280;
    --rule:    #374151;
  }}
}}
:root[data-theme="dark"] {{
  --bg: #111827; --bg2: #1F2937;
  --ink: #F9FAFB; --ink-60: #D1D5DB; --ink-30: #6B7280;
  --rule: #374151;
}}

* {{ box-sizing: border-box; margin: 0; padding: 0; }}
body {{ background: var(--bg); }}

/* ── Page shell ─────────────────────────────────── */
.page {{
  max-width: 900px;
  margin: 0 auto;
  padding: 48px 56px 72px;
}}

/* ── Header ─────────────────────────────────────── */
.doc-header {{
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 28px;
  border-bottom: 3px solid var(--navy);
  margin-bottom: 32px;
}}
.doc-header .client-block h1 {{
  font-size: 22px; font-weight: 700; letter-spacing: -.3px;
  color: var(--ink); line-height: 1.2;
}}
.doc-header .client-block .subtitle {{
  font-size: 13px; color: var(--ink-60); margin-top: 5px;
  font-weight: 400;
}}
.doc-header .meta-block {{
  text-align: right;
}}
.doc-header .meta-block .period {{
  font-size: 12px; color: var(--ink-60); font-weight: 500;
  letter-spacing: .5px; text-transform: uppercase;
}}
.logo-img {{ height: 28px; display: block; margin-bottom: 10px; margin-left: auto; }}

/* ── KPI bar ─────────────────────────────────────── */
.kpi-bar {{
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1px;
  background: var(--rule);
  border: 1px solid var(--rule);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 36px;
}}
.kpi {{
  background: var(--bg);
  padding: 14px 16px;
  text-align: center;
}}
.kpi .val {{
  font-size: 26px; font-weight: 700; color: var(--navy);
  line-height: 1; font-variant-numeric: tabular-nums;
}}
.kpi .lbl {{
  font-size: 10.5px; color: var(--ink-60); margin-top: 5px;
  text-transform: uppercase; letter-spacing: .6px; font-weight: 500;
}}
.kpi.highlight .val {{ color: var(--gain-tx); }}

/* ── Section title ───────────────────────────────── */
.section-title {{
  font-size: 11px; font-weight: 600; letter-spacing: 1.2px;
  text-transform: uppercase; color: var(--ink-30);
  margin: 36px 0 14px; border-top: 1px solid var(--rule); padding-top: 16px;
}}
.section-title:first-of-type {{ border-top: none; padding-top: 0; margin-top: 0; }}

/* ── Positions table ─────────────────────────────── */
.pos-table {{ width: 100%; border-collapse: collapse; font-size: 12.5px; }}
.pos-table th {{
  font-size: 10px; font-weight: 600; letter-spacing: .8px;
  text-transform: uppercase; color: var(--ink-60);
  text-align: center; padding: 8px 10px;
  background: var(--bg2); border-bottom: 1px solid var(--rule);
}}
.pos-table th:first-child {{ text-align: left; padding-left: 12px; }}
.pos-table td {{
  padding: 7px 10px; border-bottom: 1px solid var(--rule);
  vertical-align: middle;
}}
.pos-table td.commune {{
  font-weight: 500; color: var(--ink); text-align: left;
  padding-left: 12px; min-width: 180px;
}}
.pos-table td.commune small {{ font-size: 10px; color: var(--blue); font-weight: 400; }}
.pos-table td.pos {{
  text-align: center; font-size: 11.5px; font-weight: 500;
  font-family: 'DM Mono', monospace;
  border-radius: 4px;
}}
.pos.p1 {{ color: var(--p1-tx); background: var(--p1-bg); }}
.pos.p2 {{ color: var(--p2-tx); background: var(--p2-bg); }}
.pos.p36 {{ color: var(--p36-tx); background: var(--p36-bg); }}
.pos.p7 {{ color: var(--p7-tx); background: var(--p7-bg); }}
.pos.absent {{ color: var(--ab-tx); background: var(--ab-bg); }}
.maps-pos {{ text-align: center; color: var(--ink-60); font-size: 12px; }}
.evo-cell {{ text-align: center; font-size: 13px; font-weight: 700; font-family: 'DM Mono', monospace; }}
.gain {{ color: var(--gain-tx); }}
.loss {{ color: var(--loss-tx); }}
.stable {{ color: var(--stable-tx); font-weight: 400; }}
.na {{ color: var(--ink-30); font-weight: 400; font-size: 11px; }}

/* Section header rows */
.pos-table tr.section-header td {{
  background: var(--bg2); padding: 9px 12px;
  font-size: 10.5px; font-weight: 600; letter-spacing: .6px;
  text-transform: uppercase; color: var(--ink-60);
  border-bottom: 1px solid var(--rule); border-top: 1px solid var(--rule);
}}
.dot {{
  display: inline-block; width: 8px; height: 8px;
  border-radius: 50%; margin-right: 8px; vertical-align: middle;
}}
.dot.p1 {{ background: var(--p1-tx); }}
.dot.p2 {{ background: var(--p2-tx); }}
.dot.p36 {{ background: var(--p36-tx); }}
.dot.p7 {{ background: var(--p7-tx); }}
.dot.absent {{ background: var(--ink-30); }}

/* Column pair headers */
.col-group {{ background: var(--bg2) !important; }}
.col-pair-label {{
  font-size: 9px; font-weight: 700; letter-spacing: .8px;
  text-transform: uppercase; color: var(--ink-30);
  text-align: center; padding: 5px 10px 2px;
  border-bottom: none !important;
}}

/* ── Synthèse row ─────────────────────────────────── */
.synthese {{
  margin-top: 16px;
  background: var(--bg2); border: 1px solid var(--rule);
  border-radius: 6px; padding: 14px 18px;
  font-size: 12.5px; color: var(--ink-60);
  display: flex; gap: 24px; flex-wrap: wrap; align-items: center;
}}
.synthese strong {{ color: var(--ink); }}
.synthese .gain {{ color: var(--gain-tx); font-weight: 700; font-size: 15px; }}
.synthese .loss {{ color: var(--loss-tx); font-weight: 600; }}

/* ── Legend ──────────────────────────────────────── */
.legend {{
  display: flex; gap: 16px; margin-bottom: 14px;
  font-size: 11px; color: var(--ink-60); flex-wrap: wrap; align-items: center;
}}
.legend-item {{ display: flex; align-items: center; gap: 5px; }}
.legend-chip {{
  display: inline-block; padding: 2px 8px; border-radius: 3px;
  font-size: 10px; font-weight: 600;
}}

/* ── GBP section ─────────────────────────────────── */
.gbp-grid {{
  display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
  margin-bottom: 24px;
}}
.gbp-card {{
  border: 1px solid var(--rule); border-radius: 6px;
  padding: 14px 16px; background: var(--bg);
}}
.gbp-card .val {{ font-size: 22px; font-weight: 700; color: var(--navy); }}
.gbp-card .lbl {{ font-size: 11px; color: var(--ink-60); margin-top: 4px; font-weight: 500; }}

.posts-list {{ list-style: none; }}
.posts-list li {{
  display: flex; gap: 10px; padding: 9px 0;
  border-bottom: 1px solid var(--rule); font-size: 12.5px;
  align-items: baseline;
}}
.posts-list li:last-child {{ border-bottom: none; }}
.post-tag {{
  font-size: 10px; font-weight: 600; padding: 2px 8px;
  border-radius: 10px; white-space: nowrap;
  flex-shrink: 0;
}}
.tag-done {{ background: var(--p1-bg); color: var(--p1-tx); }}
.tag-todo {{ background: var(--p36-bg); color: var(--p36-tx); }}
.post-commune {{ font-weight: 600; color: var(--ink); }}
.post-url {{ font-size: 11px; color: var(--ink-30); font-family: 'DM Mono', monospace; }}

/* ── Plan d'action ───────────────────────────────── */
.plan-grid {{
  display: grid; gap: 8px;
}}
.plan-item {{
  display: grid; grid-template-columns: 100px 1fr 120px;
  gap: 12px; padding: 12px 14px;
  border-left: 3px solid transparent;
  background: var(--bg2); border-radius: 0 6px 6px 0;
  align-items: start; font-size: 12.5px;
}}
.plan-item.prio-1 {{ border-left-color: #EF4444; background: #FFF5F5; }}
.plan-item.prio-2 {{ border-left-color: #F97316; background: #FFF7ED; }}
.plan-item.prio-3 {{ border-left-color: #EAB308; }}
.plan-item.prio-4 {{ border-left-color: #3B82F6; }}
.plan-prio {{ font-size: 10px; font-weight: 700; color: var(--ink-60); text-transform: uppercase; letter-spacing: .5px; }}
.plan-action {{ font-weight: 500; color: var(--ink); line-height: 1.4; }}
.plan-when {{ font-size: 11px; color: var(--ink-60); text-align: right; }}

/* ── Observation box ─────────────────────────────── */
.obs-box {{
  border-left: 3px solid var(--blue); padding: 14px 18px;
  background: #EFF6FF; border-radius: 0 6px 6px 0;
  margin: 16px 0;
}}
.obs-box .obs-label {{
  font-size: 10px; font-weight: 700; text-transform: uppercase;
  letter-spacing: .6px; color: var(--blue); margin-bottom: 6px;
}}
.obs-box p {{ font-size: 12.5px; color: var(--ink); line-height: 1.6; }}

/* ── URL list ────────────────────────────────────── */
.url-grid {{
  display: grid; grid-template-columns: 1fr 1fr; gap: 4px;
}}
.url-item {{
  font-size: 11px; font-family: 'DM Mono', monospace;
  color: var(--ink-60); padding: 3px 0;
}}

/* ── Footer ──────────────────────────────────────── */
.doc-footer {{
  margin-top: 52px; padding-top: 20px;
  border-top: 1px solid var(--rule);
  display: flex; justify-content: space-between;
  font-size: 11px; color: var(--ink-30);
}}

/* ── Print ───────────────────────────────────────── */
@media print {{
  .page {{ padding: 32px 40px; }}
  .kpi-bar {{ break-inside: avoid; }}
  .pos-table tr {{ break-inside: avoid; }}
  .section-break {{ break-before: page; }}
}}
</style>

<div class="page">

<!-- HEADER -->
<header class="doc-header">
  <div class="client-block">
    <h1>Rapport de positionnement<br>rt-toiture74.fr</h1>
    <p class="subtitle">Référencement naturel (SEO) &amp; Google Maps (GBP) · 28 communes ciblées</p>
  </div>
  <div class="meta-block">
    <img class="logo-img" src="data:image/png;base64,{LOGO_B64}" alt="Renk">
    <p class="period">Juillet → Août 2026</p>
    <p class="period" style="margin-top:4px;color:var(--ink-30);font-size:11px">Produit le 7 sept. 2026</p>
  </div>
</header>

<!-- KPI BAR -->
<div class="kpi-bar">
  <div class="kpi highlight"><div class="val">{n_p1}</div><div class="lbl">Communes Page 1</div></div>
  <div class="kpi"><div class="val">{n_p2}</div><div class="lbl">Communes Page 2</div></div>
  <div class="kpi"><div class="val">{gbp_pos}</div><div class="lbl">Fiches GBP positionnées</div></div>
  <div class="kpi highlight"><div class="val">+{total_gain}</div><div class="lbl">Positions gagnées</div></div>
  <div class="kpi"><div class="val">16</div><div class="lbl">Avis Google · 5,0 ★</div></div>
</div>

<!-- LÉGENDE -->
<div class="legend">
  <strong style="font-size:11px;color:var(--ink)">Légende SEO :</strong>
  <span class="legend-item"><span class="legend-chip" style="background:var(--p1-bg);color:var(--p1-tx)">● Page 1</span></span>
  <span class="legend-item"><span class="legend-chip" style="background:var(--p2-bg);color:var(--p2-tx)">● Page 2</span></span>
  <span class="legend-item"><span class="legend-chip" style="background:var(--p36-bg);color:var(--p36-tx)">● Pages 3–6</span></span>
  <span class="legend-item"><span class="legend-chip" style="background:var(--p7-bg);color:var(--p7-tx)">● Pages 7+</span></span>
  <span class="legend-item"><span class="legend-chip" style="background:var(--ab-bg);color:var(--ab-tx)">● Absent</span></span>
  <span style="margin-left:auto;font-size:11px;color:var(--gain-tx);font-weight:600">↑ Gain positions</span>
  <span style="font-size:11px;color:var(--loss-tx);font-weight:600">↓ Recul</span>
</div>

<!-- POSITIONS TABLE -->
<p class="section-title">Positionnement — classé par performance actuelle · {len(COMMUNES)} requêtes auditées</p>
<table class="pos-table">
  <thead>
    <tr class="col-pair-label">
      <th rowspan="2" class="commune" style="text-align:left;padding-left:12px;vertical-align:bottom">Requête</th>
      <th colspan="2" style="background:#F0FDF4;color:#166534;border-bottom:2px solid #BBF7D0">Juillet 2026 (M‑1)</th>
      <th colspan="2" style="background:#EFF6FF;color:#1E40AF;border-bottom:2px solid #BFDBFE">Août 2026 (M)</th>
      <th colspan="2" style="background:var(--bg2);border-bottom:1px solid var(--rule)">Évolution</th>
    </tr>
    <tr>
      <th style="background:#F0FDF4;color:#166534">SEO</th>
      <th style="background:#F0FDF4;color:#166534">Maps</th>
      <th style="background:#EFF6FF;color:#1E40AF">SEO</th>
      <th style="background:#EFF6FF;color:#1E40AF">Maps</th>
      <th>SEO</th>
      <th>Maps</th>
    </tr>
  </thead>
  <tbody>
    {TABLE_ROWS}
  </tbody>
</table>

<!-- SYNTHÈSE -->
<div class="synthese">
  <span><strong>{prog} communes</strong> en progression</span>
  <span class="gain">+{total_gain} positions gagnées au total</span>
  <span><strong>{recul} communes</strong> en recul</span>
  <span style="margin-left:auto;font-size:11px;color:var(--ink-30)">Période : juillet → août 2026</span>
</div>

<!-- OBSERVATION -->
<div class="section-break"></div>
<p class="section-title">Observation clé — GBP &amp; positionnement Maps</p>
<div class="obs-box">
  <div class="obs-label">💡 Corrélation posts GBP → Maps confirmée</div>
  <p>L'analyse des 36 premiers jours montre une corrélation directe entre les posts GBP publiés et les positions Maps obtenues. Épagny-Metz-Tessy, absent en SEO naturel, est classé Maps #4 uniquement grâce à l'activité sur la fiche GBP. Poisy (Maps #5) et Bonneville (Maps #9) confirment le même mécanisme. Les communes sans post GBP ciblé restent systématiquement absentes du Pack Maps.</p>
  <p style="margin-top:8px"><strong>Conclusion :</strong> Publier un post GBP ciblé par commune est le levier le plus rapide pour apparaître en Maps. Stratégie à dupliquer sur les communes encore absentes.</p>
</div>

<!-- GBP POSTS -->
<p class="section-title">Google Business Profile — Publications</p>
<div class="gbp-grid">
  <div class="gbp-card"><div class="val">16</div><div class="lbl">Avis Google · Note 5,0 ★</div></div>
  <div class="gbp-card"><div class="val">12</div><div class="lbl">Posts GBP publiés (9 initiaux + 3 semaine 1 sept.)</div></div>
  <div class="gbp-card"><div class="val">7</div><div class="lbl">Communes positionnées en Maps</div></div>
  <div class="gbp-card"><div class="val">73</div><div class="lbl">Pages indexées sur rt-toiture74.fr</div></div>
</div>

<ul class="posts-list">
  <li><span class="post-tag tag-done">✓ Publié</span><span class="post-commune">Poisy</span><span style="color:var(--ink-60);font-size:12px"> · Démoussage + traitement hydrofuge</span><span class="post-url" style="margin-left:auto">/couvreur/poisy</span></li>
  <li><span class="post-tag tag-done">✓ Publié</span><span class="post-commune">Épagny-Metz-Tessy</span><span style="color:var(--ink-60);font-size:12px"> · Rénovation toiture + MaPrimeRénov'</span><span class="post-url" style="margin-left:auto">/couvreur/epagny-metz-tessy</span></li>
  <li><span class="post-tag tag-done">✓ Publié</span><span class="post-commune">Bonneville</span><span style="color:var(--ink-60);font-size:12px"> · Nettoyage haute pression + hydrofuge</span><span class="post-url" style="margin-left:auto">/couvreur/bonneville</span></li>
  <li><span class="post-tag tag-done">✓ Publié</span><span class="post-commune">Douvaine</span><span style="color:var(--ink-60);font-size:12px"> · Réparation urgente — Chablais</span><span class="post-url" style="margin-left:auto">/couvreur/douvaine</span></li>
  <li><span class="post-tag tag-done">✓ Publié</span><span class="post-commune">Annecy</span><span style="color:var(--ink-60);font-size:12px"> · Toutes prestations · Urgence infiltration</span><span class="post-url" style="margin-left:auto">/couvreur/annecy</span></li>
  <li><span class="post-tag tag-done">✓ Publié</span><span class="post-commune">Chamonix / Megève</span><span style="color:var(--ink-60);font-size:12px"> · Spécialiste toiture alpine</span><span class="post-url" style="margin-left:auto">/couvreur/chamonix-mont-blanc</span></li>
  <li><span class="post-tag tag-done">✓ Publié</span><span class="post-commune">Nord 74</span><span style="color:var(--ink-60);font-size:12px"> · Couvreur RGE Genève–Annecy (Bonneville, Cluses, Annemasse)</span><span class="post-url" style="margin-left:auto">/couvreur/bonneville</span></li>
  <li><span class="post-tag tag-done">✓ Publié</span><span class="post-commune">Annemasse</span><span style="color:var(--ink-60);font-size:12px"> · Démoussage avant automne</span><span class="post-url" style="margin-left:auto">/couvreur/annemasse</span></li>
  <li><span class="post-tag tag-done">✓ Sept.</span><span class="post-commune">Sciez · Collonges-sous-Salève · Vétraz-Monthoux</span><span style="color:var(--ink-60);font-size:12px"> · Semaine 1</span></li>
  <li><span class="post-tag tag-todo">⏳ À publier</span><span class="post-commune">Bonne · Bons-en-Chablais · Saint-Cergues</span><span style="color:var(--ink-60);font-size:12px"> · Semaine 2 sept.</span></li>
</ul>

<!-- PLAN D'ACTION -->
<p class="section-title section-break">Plan d'action SEO — Prochaines étapes</p>
<div class="plan-grid">
  <div class="plan-item prio-1">
    <span class="plan-prio">🔴 Prioritaire</span>
    <span class="plan-action">Indexation GSC /zingueur/ — 10 URLs/jour max jusqu'à completion</span>
    <span class="plan-when">En cours · Sept 2026</span>
  </div>
  <div class="plan-item prio-1">
    <span class="plan-prio">🔴 Prioritaire</span>
    <span class="plan-action">Posts GBP Semaine 2 : Bonne, Bons-en-Chablais, Saint-Cergues</span>
    <span class="plan-when">Cette semaine</span>
  </div>
  <div class="plan-item prio-2">
    <span class="plan-prio">🟠 Important</span>
    <span class="plan-action">Passer de 16 à 25 avis Google — envoyer lien après chaque chantier (objectif +2/semaine)</span>
    <span class="plan-when">Sept–Oct 2026</span>
  </div>
  <div class="plan-item prio-2">
    <span class="plan-prio">🟠 Important</span>
    <span class="plan-action">Posts GBP Semaines 3–6 : Veigy, Veyrier, Menthon, Talloires, Bossey, Reignier, Viuz, Chens, Yvoire, Messery</span>
    <span class="plan-when">Oct 2026</span>
  </div>
  <div class="plan-item prio-3">
    <span class="plan-prio">🟡 À planifier</span>
    <span class="plan-action">Photos avant/après géolocalisées sur GBP — par commune d'intervention</span>
    <span class="plan-when">En continu</span>
  </div>
  <div class="plan-item prio-3">
    <span class="plan-prio">🟡 À planifier</span>
    <span class="plan-action">Inscription annuaires : PagesJaunes, Houzz, Trustpilot — NAP cohérent</span>
    <span class="plan-when">Oct–Nov 2026</span>
  </div>
  <div class="plan-item prio-4">
    <span class="plan-prio">🔵 Moyen terme</span>
    <span class="plan-action">100+ avis Google — profil d'autorité. Top 3 Maps sur 28/28 communes</span>
    <span class="plan-when">Horizon 2027</span>
  </div>
</div>

<!-- PAGES INDEXÉES -->
<p class="section-title section-break">Pages créées — URLs indexées sur rt-toiture74.fr</p>
<p style="font-size:12px;color:var(--ink-60);margin-bottom:14px"><strong style="color:var(--ink)">28 pages SEO local</strong> /couvreur/[commune] · <strong style="color:var(--ink)">42 articles blog</strong> · <strong style="color:var(--ink)">73 pages</strong> indexées au total</p>
<div class="url-grid">
  <div class="url-item">rt-toiture74.fr/couvreur/vetraz-monthoux</div>
  <div class="url-item">rt-toiture74.fr/couvreur/annemasse</div>
  <div class="url-item">rt-toiture74.fr/couvreur/bonne</div>
  <div class="url-item">rt-toiture74.fr/couvreur/sciez</div>
  <div class="url-item">rt-toiture74.fr/couvreur/collonges-sous-saleve</div>
  <div class="url-item">rt-toiture74.fr/couvreur/chamonix-mont-blanc</div>
  <div class="url-item">rt-toiture74.fr/couvreur/bonneville</div>
  <div class="url-item">rt-toiture74.fr/couvreur/cluses</div>
  <div class="url-item">rt-toiture74.fr/couvreur/saint-julien-en-genevois</div>
  <div class="url-item">rt-toiture74.fr/couvreur/douvaine</div>
  <div class="url-item">rt-toiture74.fr/couvreur/bons-en-chablais</div>
  <div class="url-item">rt-toiture74.fr/couvreur/saint-cergues</div>
  <div class="url-item">rt-toiture74.fr/couvreur/veigy-foncenex</div>
  <div class="url-item">rt-toiture74.fr/couvreur/annecy</div>
  <div class="url-item">rt-toiture74.fr/couvreur/veyrier-du-lac</div>
  <div class="url-item">rt-toiture74.fr/couvreur/menthon-saint-bernard</div>
  <div class="url-item">rt-toiture74.fr/couvreur/talloires</div>
  <div class="url-item">rt-toiture74.fr/couvreur/bossey</div>
  <div class="url-item">rt-toiture74.fr/couvreur/megeve</div>
  <div class="url-item">rt-toiture74.fr/couvreur/sallanches</div>
  <div class="url-item">rt-toiture74.fr/couvreur/la-roche-sur-foron</div>
  <div class="url-item">rt-toiture74.fr/couvreur/reignier-esery</div>
  <div class="url-item">rt-toiture74.fr/couvreur/viuz-en-sallaz</div>
  <div class="url-item">rt-toiture74.fr/couvreur/chens-sur-leman</div>
  <div class="url-item">rt-toiture74.fr/couvreur/yvoire</div>
  <div class="url-item">rt-toiture74.fr/couvreur/messery</div>
  <div class="url-item">rt-toiture74.fr/couvreur/poisy</div>
  <div class="url-item">rt-toiture74.fr/couvreur/epagny-metz-tessy</div>
</div>

<!-- FOOTER -->
<footer class="doc-footer">
  <span>rt-toiture74.fr · Bilan SEO Août 2026</span>
  <span>Rapport produit par <strong>renk</strong> · optimization.fr</span>
</footer>

</div>
"""

with open('/private/tmp/claude-501/-Users-Steve-Downloads-rt-toiture-next/bd715db5-5e63-4309-99f6-1b09e42f42ff/scratchpad/rapport_seo.html', 'w', encoding='utf-8') as f:
    f.write(HTML)
print("Done")