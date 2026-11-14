# Schematic: the photon sphere (3 r_g, near the black hole) and how a distant observer sees it (radius sqrt(27) r_g).
# Light rays in Schwarzschild spacetime, from the orbit equation u'' + u = 3 u^2 (u = r_g/r, phi = angle).
# Plain loops on purpose, so the script is easy to read.
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
TEAL = '#3fb3ad'; ORANGE = '#e8a25a'; GREY = '#8a8478'
bc = np.sqrt(27.0)

def ray(b, phimax=50.0):
    # integrate the orbit equation with a simple RK4 in phi; returns x, y of the ray
    u, du = 0.0, 1.0 / b
    phi, h = 0.0, 0.002
    xs, ys = [], []
    for step in range(20000):
        if u > 0:
            xs.append(np.cos(phi) / u); ys.append(np.sin(phi) / u)
        if u >= 0.5 or (u < 0 and step > 10) or phi > phimax:   # crossed the horizon, or escaped
            break
        def acc(uu): return 3 * uu * uu - uu
        k1u, k1v = du, acc(u)
        k2u, k2v = du + 0.5 * h * k1v, acc(u + 0.5 * h * k1u)
        k3u, k3v = du + 0.5 * h * k2v, acc(u + 0.5 * h * k2u)
        k4u, k4v = du + h * k3v, acc(u + h * k3u)
        u += h * (k1u + 2 * k2u + 2 * k3u + k4u) / 6
        du += h * (k1v + 2 * k2v + 2 * k3v + k4v) / 6
        phi += h
    return np.array(xs), np.array(ys)

fig, ax = plt.subplots(figsize=(14, 7.2))
ax.set_aspect('equal'); ax.set_xlim(-9.8, 17.5); ax.set_ylim(-6.6, 7.2); ax.axis('off')
t = np.linspace(0, 2 * np.pi, 400)

# rays: captured (inside sqrt 27) and escaping (outside), mirrored above and below
for b in [1.5, 3.0, 4.2, 4.9, 6.0, 7.0]:
    x, y = ray(b)
    keep = (x < 15) & (x > -3.6)
    col = GREY if b < bc else ink
    for s in [1, -1]:
        ax.plot(np.where(keep, x, np.nan), s * np.where(keep, y, np.nan), color=col, lw=1.1, alpha=0.75)
# the critical ray, which winds onto the photon sphere
x, y = ray(bc + 1e-6, phimax=2.5 * np.pi)
keep = (x < 15) & (x > -3.6)
for s in [1, -1]:
    ax.plot(np.where(keep, x, np.nan), s * np.where(keep, y, np.nan), color=TEAL, lw=2.4)

ax.add_patch(plt.Circle((0, 0), 2, color='black', ec=ORANGE, lw=2.5, zorder=3))
ax.plot(3 * np.cos(t), 3 * np.sin(t), ls='--', color=TEAL, lw=1.8, zorder=4)

# observer's screen on the right, with the apparent edge of the shadow
ax.plot([15, 15], [-6.2, 6.2], color=ink, lw=2)
for s in [1, -1]:
    ax.plot([0, 15], [s * bc, s * bc], ls=':', color=TEAL, lw=1.4)
    ax.plot(15, s * bc, 'o', color=TEAL, ms=8, zorder=5)
ax.plot([15, 15.9], [0, 0], color=TEAL, lw=1.2)
ax.annotate('', xy=(15.9, bc), xytext=(15.9, 0), arrowprops=dict(arrowstyle='->', color=TEAL, lw=1.6))
ax.text(16.25, bc / 2, 'apparent radius\nof the shadow\n$\\sqrt{27}\\,r_g \\approx 5.2\\,r_g$', va='center', fontsize=22, color=TEAL, linespacing=1.25)
ax.text(15, -6.55, "observer's view", ha='center', va='top', fontsize=21, color=ink)

ax.annotate('photon sphere, $3\\,r_g$\n(measured near the black hole)', xy=(-2.6, -1.5), xytext=(-9.6, -4.4), fontsize=21,
            color=TEAL, arrowprops=dict(arrowstyle='-', color=TEAL, lw=1))
ax.annotate('event horizon, $2\\,r_g$', xy=(-1.73, 1.0), xytext=(-9.6, 3.6), fontsize=21, color=ORANGE,
            arrowprops=dict(arrowstyle='-', color=ORANGE, lw=1))
plt.savefig('../img/explainers/jmn-fig0_photon_sphere.png', dpi=110, bbox_inches='tight', pad_inches=0.15)
print('ok')
