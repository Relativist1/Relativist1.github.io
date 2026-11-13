---
title: "What if M87* is not a black hole?"
number: 2
summary: "Einstein's theory allows a collapsing star to end without an event horizon. We ran the first 3D simulation of gas falling onto such an object. It accretes like a black hole and looks like one in today's images, except for a faint glow inside the shadow that future telescopes could see."
description: "Could M87* have no event horizon? A plain-language explainer of the first GRMHD simulation of gas falling onto the horizonless JMN-1 object."
topic: "Spacetime"
level: "First-year undergraduates"
date: 2026-11-13
math: true
breath:
  - "General relativity allows a collapsing star to end without an event horizon, as a dense ball of matter with a singularity at its centre."
  - "If the ball is compact enough, it casts the same shadow as a black hole."
  - "We ran the first 3D simulation of hot, magnetised gas falling all the way onto such an object. It accretes at nearly the same rate as a black hole, and today's telescopes would see the same image."
  - "The difference is a faint glow inside the shadow, which the telescope upgrades planned for the next few years should be able to test."
concepts:
  - term: "Event horizon"
    text: "A one-way surface around a black hole. Anything that crosses it, light included, can never come back out. For a mass $M$ it sits at $2r_g$, where $r_g = GM/c^2$ is the gravitational radius."
  - term: "Singularity"
    text: "A point where density becomes infinite and Einstein's equations stop giving answers. A *naked* singularity is one with no horizon around it."
  - term: "Photon sphere"
    text: "The distance, $3r_g$, at which gravity bends light into a circular orbit. Light passing closer falls in; light passing farther escapes."
  - term: "Shadow"
    text: "The dark patch in the middle of the bright ring. Its edge is drawn by light skimming the photon sphere, which makes it about two and a half times wider than the horizon."
  - term: "Accretion"
    text: "Gas spiralling onto a heavy object. Friction and magnetic fields heat it to billions of degrees, and it glows; around M87* the glow comes out mostly as radio waves."
  - term: "GRMHD"
    text: "General relativistic magnetohydrodynamics: the equations of a hot, magnetised gas, solved on a computer in curved spacetime, step by step in time."
  - term: "Magnetically arrested disk"
    text: "A disk that has dragged in so much magnetic field that the field pushes back, and the gas falls in fits and starts. Simulations favour this state for M87*."
  - term: "Gravitational redshift"
    text: "Light climbing out of a gravitational well loses energy, so it arrives at a lower frequency and looks dimmer. The deeper it starts, the more it loses."
  - term: "Dynamic range"
    text: "The ratio between the brightest and the faintest feature an image can show reliably. A sharp image can still miss a faint detail sitting next to a bright one."
paper_url: "https://arxiv.org/abs/2604.15430"
paper_label: "Read the preprint"
paper_venue: "Submitted to Physical Review Letters (2026)"
paper_title: "GRMHD accretion beyond the black hole paradigm: Light from within the shadow"
paper_cite: "Saurabh, M. Wielgus, P. Bambhaniya, E. M. de Gouveia Dal Pino, A. P. Lobanov & P. S. Joshi (2026). GRMHD accretion beyond the black hole paradigm: Light from within the shadow. Submitted to Physical Review Letters, arXiv:2604.15430."
---

In 1937 a lost painting by Johannes Vermeer surfaced in the Netherlands. Vermeer is the seventeenth-century Dutch painter of *Girl with a Pearl Earring*. The leading Vermeer expert of the day called the painting a masterpiece, and a museum in Rotterdam paid a fortune for it.

It had been painted a few years earlier by Han van Meegeren, a Dutch artist the critics had ignored. He went on to sell several more "Vermeers", one of them to Hermann Göring, the Nazi leader. After the war, the Dutch police traced that sale to him and charged him with selling a national treasure to the enemy. His defence was a confession: he had painted it himself. When nobody believed him, he painted another one in front of witnesses.

The experts had checked everything they knew how to check: the colours, the faces, the cracks of old paint. The fake was finally exposed by chemistry. Van Meegeren had hardened his paint with an early plastic, a material that did not exist until the twentieth century.

I think about this story more often than an astrophysicist probably should. It asks the question every scientist has to live with: when everything you know how to check says "genuine", how sure are you?

In 2019 the Event Horizon Telescope (EHT), a network of radio dishes across the Earth working as a single telescope, published the first image of a black hole: a ring of light around a dark centre, in the galaxy M87, 55 million light-years away. The object is called M87\*. We all called it a black hole, and it very probably is one. This explainer asks what an object that only looks like a black hole would have to be, and what would give it away.

## How a star becomes a black hole

Einstein's general relativity (1915) describes gravity as the bending of space and time by mass. A few weeks after it appeared, Karl Schwarzschild found the spacetime around a single non-spinning mass. Inside that solution sat a surface from which nothing can return: the [event horizon](#c-event-horizon){:.term}.

{% include concept.html t="Event horizon" %}

Whether nature could actually form one was unclear for decades. In 1939 Oppenheimer and Snyder answered it with the simplest collapse possible. B. Datt had found the same solution a year earlier. Their model:

- a ball of dust with no pressure and uniform density;
- released from rest.

The outcome:

- nothing resists the collapse;
- an event horizon forms before the centre is crushed;
- the [singularity](#c-singularity){:.term}, the point of infinite density, forms behind the horizon, out of sight.

{% include concept.html t="Singularity" %}

Almost every black hole in a textbook descends from this calculation. Its assumptions, though, are idealised: real stars have neither uniform density nor zero pressure.

## A different collapse

In 2011 Joshi, Malafarina and Narayan relaxed both assumptions:

- the density decreases outward from the centre;
- the matter has pressure only in the sideways (tangential) direction. Picture particles on circular orbits around the centre, pressing on their neighbours but never outward.

The outcome changes:

- the collapse slows and ends in a static ball;
- a singularity forms at the centre;
- no event horizon forms. The singularity is naked.

This is the JMN-1 spacetime. Outside the ball it is identical to a black hole of the same mass, as Einstein's equations require. Inside it is a ball of matter with a singularity at its centre.

No new physics is needed: the same theory with different initial conditions, and the horizon never appears. I find that the most unsettling part.

## Same shadow, different insides

What a telescope sees is set by light passing close to the object. At three gravitational radii, light can orbit in a circle: the [photon sphere](#c-photon-sphere){:.term}. Light passing inside it falls in, and light passing outside escapes. The size of the dark centre in the image, the [shadow](#c-shadow){:.term}, is set by the photon sphere, not by the horizon.

{% include concept.html t="Photon sphere" %}
{% include concept.html t="Shadow" %}

A JMN-1 ball smaller than three gravitational radii has a photon sphere in exactly the same place. Light that stays outside the ball cannot distinguish the two. We chose a ball of 2.8 gravitational radii.

<figure class="figure"><img src="/img/explainers/jmn-fig1_anatomy.png" alt="Schematic of a Schwarzschild black hole and a JMN-1 object to scale: both have a photon sphere at three gravitational radii; the black hole has an event horizon at two, and JMN-1 a ball of matter of radius 2.8 with a singularity at its centre"><figcaption>Schematic of a Schwarzschild black hole and a JMN-1 object, to scale.</figcaption></figure>

## Can it accrete?

M87\* shines because gas falls onto it ([accretion](#c-accretion){:.term}). This gas radiates only a small part of its energy. Most of the heat is carried inward and, around a black hole, disappears through the horizon. An object without a horizon needs another way to dispose of it.

{% include concept.html t="Accretion" %}

In earlier simulations of naked singularities, the gas never reached the centre: it piled up or was pushed back out. An object that cannot accrete cannot be M87\*.

Newtonian mechanics already contains such a barrier. For a particle of mass $m$ with angular momentum $L$ orbiting a mass $M$:

<div class="eq-box" markdown="1">
$$ V_{\text{eff}}(r) = -\frac{GMm}{r} + \frac{L^2}{2mr^2} $$
</div>

- the first term is gravity, pulling inward;
- the second is the centrifugal term, pushing outward, and it grows faster as $r$ decreases.

So, classically, any orbiting particle meets a wall before the centre. Near a black hole, general relativity adds an attractive term that removes the wall. Inside a JMN-1 ball, it depends on the size:

- a ball larger than $3\,r_g$: the wall returns and becomes infinitely high;
- our ball of $2.8\,r_g$: no wall. Gas can flow all the way to the singularity, which absorbs it as a horizon would.

<figure class="figure"><img src="/img/explainers/jmn-fig2_wall.png" alt="Effective potential for a particle with angular momentum 3 r_g c, for a black hole and for JMN-1 balls of 2.8 and 5 gravitational radii"><figcaption>Effective potential for a particle with angular momentum $3\,r_g c$, for a black hole and for JMN-1 balls of 2.8 and 5 $r_g$.</figcaption></figure>

## The simulations

A potential tells you what is allowed, not what turbulent, magnetised gas will actually do. So we simulated it.

- Identical initial conditions for both objects: a torus of gas 10 to 20 gravitational radii from the centre, threaded with a magnetic field loop.
- The [GRMHD](#c-grmhd){:.term} code KHARMA, which we modified for a spacetime without a horizon.
- About five million cells, evolved for the equivalent of ten years for M87\*.

{% include concept.html t="GRMHD" %}

Results:

- Both reach a [magnetically arrested disk](#c-magnetically-arrested-disk){:.term}, the state favoured for M87\*.
- In JMN-1, gas reaches the inner boundary of the simulation, 0.1 gravitational radii from the singularity.
- Scaled to M87\*, both accrete roughly two hundred Earth masses per year. The JMN-1 rate is lower by less than a factor of two, a smaller difference than among the black-hole models the EHT itself uses.

{% include concept.html t="Magnetically arrested disk" %}

## The images

We computed images with ipole, a code that traces light through curved spacetime, at the EHT frequency of 230 GHz and with M87\*'s mass, distance and inclination.

Below are the two simulations in motion. Try to tell which is which before reading the caption.

<figure class="figure video"><video src="/img/explainers/jmn-bh-vs-jmn1.mp4" poster="/img/explainers/jmn-bh-vs-jmn1-poster.jpg" autoplay muted loop playsinline controls preload="metadata" aria-label="Simulated 230 GHz movies of gas around a black hole (left) and around JMN-1 (right)"></video><figcaption>Simulated 230 GHz movies. Left: black hole. Right: JMN-1.</figcaption></figure>

- Both are consistent with the EHT observations.
- The bright ring is at the same position, because it is formed by light that never enters the ball.
- The brightness centroid of the JMN-1 image moves inward by about 10%. That is smaller than the uncertainty from M87\*'s mass, distance and plasma properties.

At present resolution and sensitivity, the two are indistinguishable.

## Light from inside the shadow

Around a black hole, light from inside the ring comes only from gas between the horizon and the photon sphere. Below a certain radius in the image, the inner shadow, there is almost nothing: the gas that would emit there has crossed the horizon.

JMN-1 has no horizon. Gas emits all the way down to the singularity, and that light can escape, though it loses energy on the way out ([gravitational redshift](#c-gravitational-redshift){:.term}). For a static emitter, the ratio of received to emitted frequency is

{% include concept.html t="Gravitational redshift" %}

<div class="eq-box" markdown="1">
$$ g = \sqrt{-g_{tt}(r)} $$
</div>

where $g_{tt}$ is the metric component that sets the rate of clocks at radius $r$.

- Black hole: $g = \sqrt{1 - 2r_g/r}$, which vanishes at the horizon.
- JMN-1 interior: $g \propto r^{1.25}$, which vanishes only at the singularity.
- Observed brightness scales roughly as $g^3$: faint, but non-zero.

<figure class="figure"><img src="/img/explainers/jmn-fig3_redshift.png" alt="Redshift factor for a static emitter as a function of emission radius, for a black hole and for JMN-1"><figcaption>Redshift factor for a static emitter as a function of emission radius, for a black hole and JMN-1.</figcaption></figure>

Lensing magnifies this region strongly: emission from within $0.002\,r_g$ of the singularity covers a patch about one gravitational radius across in the image. In our images, the brightness at half the inner-shadow radius is a few percent of the ring's peak. The black-hole image is nearly dark there.

A painting made around 1660 cannot contain a plastic from 1907. A black hole cannot shine from inside its shadow. JMN-1 can.

## What it takes to see it

A few percent of the peak brightness is below what current EHT images can reliably show. Their limitation here is [dynamic range](#c-dynamic-range){:.term}, the contrast between the brightest and faintest features an image can show, rather than resolution. Upgrades planned for the next few years, including the next-generation EHT, target exactly that.

{% include concept.html t="Dynamic range" %}

## Caveats

- Our models do not spin; M87\* very likely does. A spinning JMN-1 that satisfies Einstein's equations with physically reasonable matter has not yet been found.
- The simulation excludes the region within $0.1\,r_g$ of the singularity. The inner glow depends on that boundary and on the assumed electron temperature.
- In every case we tried, JMN-1 showed more emission inside the shadow than the black hole. The exact amount remains open.

Strictly speaking, no observation can prove that M87\* is a black hole. It can only rule out the alternatives, in the places where they disagree with it. For JMN-1, that place is the darkest part of the image. I expect to find it empty. If so, it will be the most informative darkness I have ever looked at.
