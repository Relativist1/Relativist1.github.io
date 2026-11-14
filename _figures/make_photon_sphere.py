# Simple schematic: where the photon sphere really is (P, at 3 r_g near the black hole)
# and where a distant observer sees it (P', at sqrt(27) r_g), using one real light ray and one apparent straight line.
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib import font_manager

for f in ['fonts/EBGaramond[wght].ttf', 'fonts/EBGaramond-Italic[wght].ttf']:
    font_manager.fontManager.addfont(f)
ink = '#e2dbcd'
plt.rcParams.update({'font.family': 'EB Garamond', 'mathtext.fontset': 'custom', 'mathtext.rm': 'EB Garamond',
                     'mathtext.it': 'EB Garamond:italic', 'font.size': 24, 'text.color': ink, 'savefig.transparent': True})
TEAL = '#3fb3ad'; ORANGE = '#e8a25a'; GREY = '#9a9488'
bc = np.sqrt(27.0)

# the real ray: integrate u'' + u = 3u^2 (u = r_g/r) from the observer's side, stop when it reaches the photon sphere
u, du, phi, h = 0.0, 1.0 / (bc + 1e-9), 0.0, 0.001
xs, ys = [], []
while True:
    if u > 0:
        xs.append(np.cos(phi) / u); ys.append(np.sin(phi) / u)
    if u > 1 / 3.2:
        break
    du += h * (3 * u * u - u)
    u += h * du
    phi += h
xs, ys = np.array(xs), np.array(ys)
P = (3 * np.cos(phi), 3 * np.sin(phi))   # the point on the photon sphere where this light comes from
xs = np.append(xs, P[0]); ys = np.append(ys, P[1])

fig, ax = plt.subplots(figsize=(13, 6.4))
ax.set_aspect('equal'); ax.set_xlim(-5, 17); ax.set_ylim(-3.6, 7.4); ax.axis('off')
t = np.linspace(0, 2 * np.pi, 400)
ax.add_patch(plt.Circle((0, 0), 2, color='black', ec=ORANGE, lw=2.5, zorder=3))
ax.plot(3 * np.cos(t), 3 * np.sin(t), ls='--', color=TEAL, lw=1.6)

# real path of the light, from P to the observer
keep = xs < 14
ax.plot(xs[keep], ys[keep], color=TEAL, lw=2.6)
ax.annotate('', xy=(12.5, ys[np.argmin(abs(xs - 12.5))]), xytext=(11.0, ys[np.argmin(abs(xs - 11.0))]),
            arrowprops=dict(arrowstyle='->', color=TEAL, lw=2.4))
# what the observer assumes: a straight line, traced back
ax.plot([0, 14], [bc, bc], ls=(0, (4, 4)), color=ink, lw=1.6)
ax.plot([14, 14], [-3.2, 7.0], color=ink, lw=2)
ax.text(14, -3.45, 'observer', ha='center', va='top', fontsize=22)

ax.plot(*P, 'o', color=TEAL, ms=11, zorder=6)
ax.plot(0, bc, 'o', color=ink, ms=11, zorder=6, mfc='none', mew=2)
ax.text(P[0] - 0.4, P[1], '$P$', ha='right', va='center', fontsize=28, color=TEAL)
ax.text(-0.35, bc + 0.25, "$P'$", ha='right', va='bottom', fontsize=28, color=ink)
ax.text(4.2, 1.2, 'where the light really is:\n$r = 3\\,r_g$', fontsize=22, color=TEAL, linespacing=1.2)
ax.text(4.2, 6.1, 'where the observer sees it:\n$\\sqrt{27}\\,r_g \\approx 5.2\\,r_g$ from the center', fontsize=22, color=ink, linespacing=1.2)
ax.text(0, 0, 'black\nhole', ha='center', va='center', fontsize=19, color=GREY, zorder=4, linespacing=1.0)
plt.savefig('../img/explainers/jmn-fig0_photon_sphere.png', dpi=110, bbox_inches='tight', pad_inches=0.15)
print('ok', P)
