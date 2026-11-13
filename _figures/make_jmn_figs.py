# Explainer figures for "What if M87* is not a black hole?" (Schwarzschild vs JMN-1, R_b = 2.8 r_g)
# Units: r in r_g = GM/c^2. Plain loops so it is easy to read and change.
# Fonts: EB Garamond (the website's font), files in _figures/fonts. Run from the _figures folder.
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib import font_manager

for f in ['fonts/EBGaramond[wght].ttf', 'fonts/EBGaramond-Italic[wght].ttf']:
    font_manager.fontManager.addfont(f)

ink = '#e2dbcd'
plt.rcParams.update({
    'font.family': 'EB Garamond', 'mathtext.fontset': 'custom',
    'mathtext.rm': 'EB Garamond', 'mathtext.it': 'EB Garamond:italic', 'mathtext.bf': 'EB Garamond:bold',
    'font.size': 24, 'axes.labelsize': 27, 'xtick.labelsize': 23, 'ytick.labelsize': 23,
    'legend.fontsize': 23, 'legend.frameon': False,
    'xtick.direction': 'in', 'ytick.direction': 'in', 'xtick.top': True, 'ytick.right': True,
    'xtick.minor.visible': True, 'ytick.minor.visible': True,
    'xtick.major.size': 10, 'ytick.major.size': 10, 'xtick.minor.size': 5, 'ytick.minor.size': 5,
    'lines.linewidth': 2.4,
    'text.color': ink, 'axes.labelcolor': ink, 'axes.edgecolor': ink, 'xtick.color': ink, 'ytick.color': ink,
    'savefig.transparent': True})

BH = '#e8a25a'     # black hole: orange
JMN = '#3fb3ad'    # JMN-1: peacock, the site's accent
GREY = '#9a9488'
OUT = '../img/explainers/'

def gtt_jmn(r, Rb):
    # -g_tt for JMN-1: power law inside the ball, Schwarzschild outside
    if r < Rb:
        return (1 - 2 / Rb) * (r / Rb) ** (2 / (Rb - 2))
    return 1 - 2 / r

# ---------------- Figure 1: the two objects, drawn to scale ----------------
fig, axes = plt.subplots(1, 2, figsize=(12, 6.4))
t = np.linspace(0, 2 * np.pi, 400)
for k in range(2):
    ax = axes[k]
    ax.set_aspect('equal'); ax.set_xlim(-5.2, 5.2); ax.set_ylim(-5.6, 4.9); ax.axis('off')
    ax.plot(3 * np.cos(t), 3 * np.sin(t), ls='--', color=ink, lw=1.6)
    if k == 0:
        ax.add_patch(plt.Circle((0, 0), 2, color='black', ec=BH, lw=2.8, zorder=3))
        ax.text(0, 0, 'hidden', ha='center', va='center', fontsize=22, style='italic', color=GREY, zorder=4)
        ax.annotate('event horizon, $2\\,r_g$', xy=(-1.41, 1.41), xytext=(-5.1, 4.3), fontsize=23,
                    arrowprops=dict(arrowstyle='-', color=ink, lw=1))
        ax.text(0, -5.4, 'Black hole', ha='center', fontsize=30, color=BH)
    else:
        for i in range(60):
            ax.add_patch(plt.Circle((0, 0), 2.8 * (1 - i / 60), color=JMN, alpha=0.035, lw=0, zorder=2))
        ax.add_patch(plt.Circle((0, 0), 2.8, fill=False, ec=JMN, lw=2.8, zorder=3))
        ax.plot(0, 0, 'o', color='white', ms=7, zorder=4)
        ax.text(0, -0.75, 'singularity', ha='center', va='center', fontsize=22, style='italic', color=ink, zorder=4)
        ax.annotate('ball of matter, $2.8\\,r_g$', xy=(-1.98, 1.98), xytext=(-5.1, 4.3), fontsize=23,
                    arrowprops=dict(arrowstyle='-', color=ink, lw=1))
        ax.text(0, -5.4, 'JMN-1', ha='center', fontsize=30, color=JMN)
    ax.annotate('photon sphere, $3\\,r_g$', xy=(2.12, -2.12), xytext=(1.0, -4.3), fontsize=23,
                arrowprops=dict(arrowstyle='-', color=ink, lw=1))
plt.tight_layout()
plt.savefig(OUT + 'jmn-fig1_anatomy.png', dpi=110)
plt.close()

# ---------------- Figure 2: is there a wall in the way? ----------------
# Effective potential for a particle with angular momentum L: V^2 = -g_tt (1 + L^2/r^2)
L = 3.0
fig, ax = plt.subplots(figsize=(10, 6.6))
r = np.linspace(2.0001, 14, 2000)
ax.plot(r, np.sqrt((1 - 2 / r) * (1 + L ** 2 / r ** 2)), color=BH, label='black hole')
for Rb, col, ls, lab in [(2.8, JMN, '-', 'JMN-1, ball of $2.8\\,r_g$ (ours)'), (5.0, GREY, '--', 'JMN-1, ball of $5\\,r_g$')]:
    r = np.linspace(0.02, 14, 4000)
    V = []
    for x in r:
        V.append(np.sqrt(gtt_jmn(x, Rb) * (1 + L ** 2 / x ** 2)))
    ax.plot(r, V, color=col, ls=ls, label=lab)
ax.axvline(2, color=BH, lw=1.2, ls=':')
ax.text(2.2, 0.06, 'horizon', color=BH, fontsize=22, rotation=90, va='bottom')
ax.annotate('a wall', xy=(0.95, 1.47), xytext=(2.9, 1.5), color=GREY, fontsize=22, style='italic', va='center',
            arrowprops=dict(arrowstyle='-', color=GREY, lw=1))
ax.text(0.6, 0.12, 'a slide', color=JMN, fontsize=22, style='italic')
ax.set_xlim(0, 14); ax.set_ylim(0, 1.8)
ax.set_xlabel('distance from the centre, $r$  [$r_g$]')
ax.set_ylabel('energy needed to get there')
ax.legend(loc='lower right', bbox_to_anchor=(1.0, 0.04))
plt.tight_layout()
plt.savefig(OUT + 'jmn-fig2_wall.png', dpi=110)
plt.close()

# ---------------- Figure 3: how much light gets out ----------------
# Redshift factor for light sent by a static source: g = sqrt(-g_tt)
fig, ax = plt.subplots(figsize=(10, 6.6))
r = np.linspace(2.0, 10, 2000)
ax.plot(r, np.sqrt(1 - 2 / r), color=BH, label='black hole')
r = np.linspace(0, 10, 4000)
g = []
for x in r:
    g.append(np.sqrt(gtt_jmn(x, 2.8)))
ax.plot(r, g, color=JMN, label='JMN-1')
ax.axvspan(0, 2, color=BH, alpha=0.10, lw=0)
ax.text(1.0, 0.93, 'inside the\nhorizon:\nnothing\nescapes', ha='center', va='top', color=BH, fontsize=21, linespacing=1.1)
ax.set_xlim(0, 10); ax.set_ylim(0, 1)
ax.set_xlabel('where the light starts, $r$  [$r_g$]')
ax.set_ylabel('redshift factor $g$')
ax.legend(loc='lower right')
plt.tight_layout()
plt.savefig(OUT + 'jmn-fig3_redshift.png', dpi=110)
plt.close()
print('figures ok')
