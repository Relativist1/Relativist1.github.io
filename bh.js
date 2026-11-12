var BH=(()=>{var M=Object.defineProperty;var j=Object.getOwnPropertyDescriptor;var $=Object.getOwnPropertyNames;var Q=Object.prototype.hasOwnProperty;var tt=(a,r,e)=>r in a?M(a,r,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[r]=e;var et=(a,r)=>{for(var e in r)M(a,e,{get:r[e],enumerable:!0})},rt=(a,r,e,s)=>{if(r&&typeof r=="object"||typeof r=="function")for(let t of $(r))!Q.call(a,t)&&t!==e&&M(a,t,{get:()=>r[t],enumerable:!(s=j(r,t))||s.enumerable});return a};var ot=a=>rt(M({},"__esModule",{value:!0}),a);var p=(a,r,e)=>tt(a,typeof r!="symbol"?r+"":r,e);var ht={};et(ht,{BlackHoleEngine:()=>y,FallbackRenderer:()=>_});function st(a,r){let s=.5*(a[0]*a[0]+a[1]*a[1]+a[2]*a[2]-r*r);return Math.sqrt(Math.max(s+Math.sqrt(s*s+r*r*a[2]*a[2]),1e-12))}function at(a,r){let e=st(a,r),s=e*e,t=2*s*e/(s*s+r*r*a[2]*a[2]),o=s+r*r,i=[(e*a[0]+r*a[1])/o,(e*a[1]-r*a[0])/o,a[2]/e];return{r:e,f:t,l:i}}function A(a){let r=1+Math.cbrt(1-a*a)*(Math.cbrt(1+a)+Math.cbrt(1-a)),e=Math.sqrt(3*a*a+r*r);return 3+e-Math.sign(a||1)*Math.sqrt((3-r)*(3+r+2*e))}function z(a,r,e,s){let t=Math.sin(r);return[t*(a*Math.cos(e)-s*Math.sin(e)),t*(a*Math.sin(e)+s*Math.cos(e)),a*Math.cos(r)]}var F=(a,r)=>a[0]*r[0]+a[1]*r[1]+a[2]*r[2],P=(a,r)=>[a[1]*r[2]-a[2]*r[1],a[2]*r[0]-a[0]*r[2],a[0]*r[1]-a[1]*r[0]],E=(a,r)=>[a[0]*r,a[1]*r,a[2]*r],S=(a,r)=>[a[0]-r[0],a[1]-r[1],a[2]-r[2]],w=a=>E(a,1/Math.hypot(a[0],a[1],a[2]));function q(a,r,e,s){let{f:t,l:o}=at(a,r),i=1/Math.sqrt(1+t),n=(m,T)=>F(m,T)+t*F(o,m)*F(o,T),u=m=>E(m,1/Math.sqrt(n(m,m))),c=w(e),h=w(s);Math.abs(F(c,h))>.995&&(h=Math.abs(c[0])<.9?[1,0,0]:[0,1,0]);let f=w(P(c,h)),d=P(f,c),l=u(c),g=u(S(d,E(l,n(d,l)))),x=u(S(S(f,E(l,n(f,l))),E(g,n(f,g))));return c=l,{pos:a,f:t,l:o,alpha:i,u:E(o,-i*t),eR:x,eU:g,eF:l}}function it(a,r){let e=A(r);if(a<=e)return 0;let s=Math.sqrt(a),t=Math.sqrt(e),o=Math.acos(r),i=2*Math.cos((o-Math.PI)/3),n=2*Math.cos((o+Math.PI)/3),u=-2*Math.cos(o/3),c=(f,d,l)=>Math.abs(f)<1e-9?0:3*(f-r)**2/(f*(f-d)*(f-l))*Math.log((s-f)/(t-f)),h=s-t-1.5*r*Math.log(s/t)-c(i,n,u)-c(n,i,u)-c(u,i,n);return Math.max(h,0)/(s**4*(s**3-3*s+2*r))}var R=(a,r,e,s)=>{let t=(a-r)/(a<r?e:s);return Math.exp(-.5*t*t)},nt=a=>[1.056*R(a,599.8,37.9,31)+.362*R(a,442,16,26.7)-.065*R(a,501.1,20.4,26.2),.821*R(a,568.8,46.9,40.5)+.286*R(a,530.9,16.3,31.1),1.217*R(a,437,11.8,36)+.681*R(a,459,26,13.8)];function I(a){let r=0,e=0,s=0;for(let u=380;u<=780;u+=5){let c=u*1e-9,h=1/(c**5*(Math.exp(.014388/(c*a))-1)),[f,d,l]=nt(u);r+=h*f,e+=h*d,s+=h*l}let t=3.2406*r-1.5372*e-.4986*s,o=-.9689*r+1.8758*e+.0415*s,i=.0557*r-.204*e+1.057*s,n=Math.min(t,o,i,0);return[t-n,o-n,i-n]}function G(a,r,e,s){let t=I(s),o=.2126*t[0]+.7152*t[1]+.0722*t[2],i=new Float32Array(a*4);for(let n=0;n<a;n++){let u=r*Math.pow(e/r,n/(a-1)),c=I(u);for(let h=0;h<3;h++)i[n*4+h]=Math.min(c[h]/o,6e4);i[n*4+3]=1}return i}function C(a,r,e){let s=A(r),t=[];for(let i=0;i<a;i++)t.push(it(s+(e-s)*i/(a-1),r));let o=Math.max(...t);return{table:new Float32Array(t.map(i=>Math.pow(i/o,.25))),rIn:s}}var N=`#version 300 es
void main(){vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2));gl_Position=vec4(p*2.-1.,0.,1.);}`,X=`#version 300 es
precision highp float;precision highp int;
uniform vec2 uRes,uShift;
uniform vec3 uPos,uER,uEU,uEF,uL;
uniform float uF,uAlpha,uFov,uA,uRh,uRin,uRout,uHFac,uJet;
uniform int uMaxSteps;
layout(location=0) out vec4 o0;layout(location=1) out vec4 o1;layout(location=2) out vec4 o2;
const float R_ESC=30.;
vec4 dmul(vec4 a,vec4 b){return vec4(a.x*b.x,a.x*b.yzw+b.x*a.yzw);}
vec4 ddiv(vec4 a,vec4 b){float i=1./b.x,q=a.x*i;return vec4(q,(a.yzw-q*b.yzw)*i);}
vec4 dsq(vec4 a){float s=sqrt(max(a.x,1e-12));return vec4(s,a.yzw*(.5/s));}
float ksR(vec3 x){float a2=uA*uA,A=.5*(dot(x,x)-a2);return sqrt(max(A+sqrt(A*A+a2*x.z*x.z),1e-12));}
void rhs(vec3 x,vec3 p,float pt,out vec3 dx,out vec3 dp){
  float a2=uA*uA;
  vec4 X=vec4(x.x,1.,0.,0.),Y=vec4(x.y,0.,1.,0.),Z=vec4(x.z,0.,0.,1.);
  vec4 Z2=vec4(x.z*x.z,0.,0.,2.*x.z);
  vec4 A=vec4(.5*(dot(x,x)-a2),x);
  vec4 r2=A+dsq(dmul(A,A)+a2*Z2);
  vec4 r=dsq(r2);
  vec4 f=ddiv(2.*dmul(r2,r),dmul(r2,r2)+a2*Z2);
  vec4 den=r2;den.x+=a2;
  vec4 lx=ddiv(dmul(r,X)+uA*Y,den),ly=ddiv(dmul(r,Y)-uA*X,den),lz=ddiv(Z,r);
  vec4 L=lx*p.x+ly*p.y+lz*p.z;L.x-=pt;
  vec4 W=dmul(f,dmul(L,L));
  dx=p-f.x*L.x*vec3(lx.x,ly.x,lz.x);
  dp=.5*W.yzw;
}
float diskG(vec2 q,vec3 p,float pt){
  float a2=uA*uA,r=sqrt(max(dot(q,q)-a2,1e-6)),f=2./r,den=r*r+a2;
  vec2 l=vec2(r*q.x+uA*q.y,r*q.y-uA*q.x)/den;
  float om=1./(pow(r,1.5)+uA);
  float lV=1.+om*(-q.y*l.x+q.x*l.y);
  float gVV=-1.+om*om*dot(q,q)+f*lV*lV;
  float ut=1./sqrt(max(-gVV,1e-6));
  return 1./(ut*(pt+om*(q.x*p.y-q.y*p.x)));
}
void main(){
  vec2 uv=(gl_FragCoord.xy*2.-uRes)/uRes.y-uShift;
  vec3 d=normalize(vec3(uv*uFov,1.));
  vec3 D=d.x*uER+d.y*uEU+d.z*uEF;
  vec3 pu=uAlpha*uF*uL+D;
  float ptu=-1./uAlpha,lp=ptu+dot(uL,pu),pt=-ptu+uF*lp;
  vec3 p=pu+uF*uL*lp,x=uPos;
  float r=ksR(x);
  bool outside=r>uRh+.05;
  vec4 h1=vec4(0.),h2=vec4(0.),sky=vec4(0.);int nh=0;float jet=0.;
  for(int i=0;i<1000;i++){
    if(i>=uMaxSteps)break;
    if(r>uRh+.05)outside=true;
    if((outside&&r<uRh+.02)||r<.2)break;
    vec3 k1x,k1p;rhs(x,p,pt,k1x,k1p);
    if(r>R_ESC&&dot(x,k1x)>0.){
      vec3 v=normalize(k1x),perp=x-dot(x,v)*v;float b=max(length(perp),1e-3);
      float dl=(2./b)*(1.-sqrt(max(0.,1.-b*b/(r*r))));
      sky=vec4(normalize(v-dl*perp/b),1./pt);break;
    }
    float h=uHFac*max(r,.3);
    if(outside)h=min(h,max(.5*(r-uRh),.01));
    vec3 k2x,k2p,k3x,k3p,k4x,k4p;
    rhs(x+.5*h*k1x,p+.5*h*k1p,pt,k2x,k2p);
    rhs(x+.5*h*k2x,p+.5*h*k2p,pt,k3x,k3p);
    rhs(x+h*k3x,p+h*k3p,pt,k4x,k4p);
    vec3 nx=x+h/6.*(k1x+2.*k2x+2.*k3x+k4x),np=p+h/6.*(k1p+2.*k2p+2.*k3p+k4p);
    if(nh==0&&uJet>0.){
      float zz=abs(x.z),R=length(x.xy),w=.7+.38*pow(zz,.62);
      jet+=uJet*exp(-R*R/(w*w))*smoothstep(2.,8.,zz)*smoothstep(160.,50.,zz)/(1.+.05*zz)*h*length(k1x)/w;
    }
    if(x.z*nx.z<0.){
      float t=x.z/(x.z-nx.z);vec2 q=mix(x.xy,nx.xy,t);
      float hr=sqrt(max(dot(q,q)-uA*uA,0.));
      if(hr>uRin&&hr<uRout&&nh<2){
        float g=diskG(q,mix(p,np,t),pt);
        if(nh==0)h1=vec4(q,g,0.);else h2=vec4(q,g,0.);
        nh++;
      }
    }
    x=nx;p=np;r=ksR(x);
  }
  o0=vec4(h1.xyz,nh>0?1.:0.);o1=vec4(h2.xyz,nh>1?1.:0.);o2=sky;
}`,B=`#version 300 es
precision highp float;precision highp sampler3D;
uniform sampler2D uG0,uG1,uG2,uBB,uTemp;uniform sampler3D uNoise;
uniform vec2 uRes;
uniform float uTime,uA,uRin,uRout,uTmax,uTComp,uLumExp,uExposure,uFov,uJetGain;
out vec4 o;
const float TMIN=500.,TMAX=60000.,NBB=256.,NT=128.;
vec3 bb(float T){float u=clamp(log(T/TMIN)/log(TMAX/TMIN),0.,1.);return texture(uBB,vec2((u*(NBB-1.)+.5)/NBB,.5)).rgb;}
float lum(vec3 c){return dot(c,vec3(.2126,.7152,.0722));}
vec3 shown(vec3 c,float ref){float y=lum(c);return y>1e-9?c*(pow(y,uLumExp)/y)/pow(ref,uLumExp-1.):vec3(0.);}
float n3(vec3 q){return texture(uNoise,q*(1./64.)).r;}
float fbm(vec3 q){float s=0.,a=.5;for(int i=0;i<4;i++){s+=a*n3(q);q=q*2.03+vec3(7.1,3.3,1.7);a*=.5;}return s/.9375;}
float streak(float lr,float ph,float sd){
  vec3 q=vec3(lr*10.+sd,cos(ph)*2.5,sin(ph)*2.5);
  float n=fbm(q);n=1.-abs(2.*n-1.);n*=n;
  float c=fbm(q*vec3(.3,.6,.6)+11.+sd);
  return n*n*(.3+2.4*c*c);
}
vec4 disk(vec4 h){
  if(h.w<.04)return vec4(0.);h.xyz/=h.w;
  float g=h.z;if(g<.02)return vec4(0.);
  float r=sqrt(max(dot(h.xy,h.xy)-uA*uA,1e-4));
  if(r<uRin||r>uRout)return vec4(0.);
  float lr=log(r),phi=atan(h.y,h.x)+2.4*lr,om=1./(pow(r,1.5)+uA);
  const float P=40.;float tM=uTime*3.5;
  float t1=fract(tM/P),t2=fract(tM/P+.5),w=abs(2.*t1-1.);
  float f=mix(streak(lr,phi-om*(t1-.5)*P,0.),streak(lr,phi-om*(t2-.5)*P,5.7),w);
  f*=.85/sqrt(w*w+(1.-w)*(1.-w));
  float u=(r-uRin)/(uRout-uRin);
  float T=uTmax*pow(texture(uTemp,vec2((u*(NT-1.)+.5)/NT,.5)).r,uTComp);
  float edge=smoothstep(uRout,uRout*.55,r);
  vec3 c=shown(bb(max(g*T,TMIN)),1.)*(.16+2.1*f)*edge*clamp(pow(g,2.2),.1,5.);
  float al=clamp(edge*(.42+2.4*f),0.,.97);
  al=max(al,edge*.92*smoothstep(9.,4.,r));
  return vec4(c,al*smoothstep(.04,.9,h.w));
}
vec4 hash44(vec4 p){p=fract(p*vec4(.1031,.103,.0973,.1099));p+=dot(p,p.wzxy+33.33);return fract((p.xxyz+p.yzzw)*p.zywx);}
vec3 starColor(float T,float g){vec3 o=bb(max(g*T,TMIN));float l0=lum(bb(T)),l=lum(o);return l>1e-9?o/l*pow(l/l0,uLumExp):vec3(0.);}
vec3 stars(vec3 d,float N,float dens,float gain,float fw,float fw0,float g){
  vec3 b=floor(d*N-.5),acc=vec3(0.);
  float s=max(max(fw,fw0)*.55,1e-5),mag=clamp(fw0*fw0*.3025/(s*s),0.,40.);
  for(int i=0;i<8;i++){
    vec3 c=b+vec3(float(i&1),float((i>>1)&1),float((i>>2)&1));
    vec4 h=hash44(vec4(c,N));
    if(h.x>dens)continue;
    vec3 sp=normalize(c+.2+.6*h.yzw);
    float dd=length(d-sp);
    float flux=pow(fract(h.x*91.7+h.w),9.)*gain;
    float T=2800.+9500.*pow(fract(h.y*53.1+h.z),2.);
    acc+=starColor(T,g)*flux*mag*exp(-dd*dd/(2.*s*s));
  }
  return acc;
}
vec3 sky(vec4 s){
  // while the camera moves the coarse pass is upsampled with linear filtering; a pixel blended
  // between the shadow (w = 0) and the sky would otherwise pick up stray stars inside the shadow
  if(s.w<.3||dot(s.xyz,s.xyz)<.81)return vec3(0.);
  vec3 d=normalize(s.xyz),p=d*150.,i=floor(p);
  float h=fract(sin(dot(i,vec3(127.1,311.7,74.7)))*43758.5453);
  if(h<.988)return vec3(0.);
  vec3 f=fract(p)-.5;float m=(h-.988)/.012;
  return mix(vec3(1.,.85,.7),vec3(.75,.85,1.),fract(h*91.7))*smoothstep(.22,0.,length(f))*(.25+m*m*1.4)*.45;
}
void main(){
  vec2 uv=gl_FragCoord.xy/uRes;
  vec4 g0=texture(uG0,uv),g1=texture(uG1,uv),g2=texture(uG2,uv);
  vec4 d1=disk(g0),d2=disk(g1);
  vec3 c=d1.rgb*d1.a+(1.-d1.a)*(d2.rgb*d2.a+(1.-d2.a)*sky(g2));
  o=vec4(c*uExposure,1.);
}`,O=`#version 300 es
precision highp float;uniform sampler2D uSrc;uniform vec2 uDst,uTexel;out vec4 o;
void main(){vec2 uv=gl_FragCoord.xy/uDst,t=uTexel;
  vec3 s=texture(uSrc,uv).rgb*4.+texture(uSrc,uv-t).rgb+texture(uSrc,uv+t).rgb+texture(uSrc,uv+vec2(t.x,-t.y)).rgb+texture(uSrc,uv-vec2(t.x,-t.y)).rgb;
  o=vec4(s/8.,1.);}`,W=`#version 300 es
precision highp float;uniform sampler2D uSrc,uBase;uniform vec2 uDst,uTexel;out vec4 o;
void main(){vec2 uv=gl_FragCoord.xy/uDst,t=uTexel;
  vec3 s=texture(uSrc,uv+vec2(-2.*t.x,0.)).rgb+texture(uSrc,uv+vec2(2.*t.x,0.)).rgb+texture(uSrc,uv+vec2(0.,-2.*t.y)).rgb+texture(uSrc,uv+vec2(0.,2.*t.y)).rgb
   +2.*(texture(uSrc,uv+vec2(-t.x,t.y)).rgb+texture(uSrc,uv+vec2(t.x,t.y)).rgb+texture(uSrc,uv+vec2(-t.x,-t.y)).rgb+texture(uSrc,uv+vec2(t.x,-t.y)).rgb);
  o=vec4(s/12.+texture(uBase,uv).rgb,1.);}`,H=`#version 300 es
precision highp float;uniform sampler2D uHdr,uBloom;uniform vec2 uRes;uniform float uBloomAmt,uDim,uSeed;out vec4 o;
vec3 aces(vec3 x){return clamp((x*(2.51*x+.03))/(x*(2.43*x+.59)+.14),0.,1.);}
void main(){vec2 uv=gl_FragCoord.xy/uRes;
  vec3 c=texture(uHdr,uv).rgb+texture(uBloom,uv).rgb*uBloomAmt;
  c=aces(c*1.1);
  c=pow(c,vec3(1./2.2));
  vec2 v=uv-.5;c*=1.-.5*dot(v,v);
  c*=uDim;
  float n=fract(sin(dot(gl_FragCoord.xy+uSeed,vec2(12.9898,78.233)))*43758.5453);
  o=vec4(c+(n-.5)/255.,1.);}`;var K=256,k=128,V=5,y=class{constructor(r,e){this.canvas=r;this.opts=e;p(this,"gl");p(this,"progs");p(this,"vao");p(this,"noise");p(this,"bb");p(this,"temp");p(this,"rIn");p(this,"w",0);p(this,"h",0);p(this,"live");p(this,"hi");p(this,"hdr");p(this,"down",[]);p(this,"up",[]);p(this,"liveValid",!1);p(this,"hiRow",0);p(this,"hiValid",!1);p(this,"band",64);p(this,"camKey","");p(this,"camU",{});p(this,"lastShadeKey","");p(this,"lastFrame",0);p(this,"slowFrames",0);p(this,"frames",0);p(this,"lost",!1);let s=r.getContext("webgl2",{antialias:!1,alpha:!1,depth:!1,powerPreference:"high-performance",preserveDrawingBuffer:!1});if(!s)throw new Error("WebGL2 unavailable");if(!s.getExtension("EXT_color_buffer_float")&&!s.getExtension("EXT_color_buffer_half_float"))throw new Error("float render targets unavailable");this.gl=s,r.addEventListener("webglcontextlost",h=>{h.preventDefault(),this.lost=!0}),this.progs={trace:this.program(X),shade:this.program(B),down:this.program(O),up:this.program(W),comp:this.program(H)},this.vao=s.createVertexArray(),this.rIn=A(e.spin);let t=64,o=new Uint8Array(t*t*t),i=1234567;for(let h=0;h<o.length;h++)i=i*1664525+1013904223>>>0,o[h]=i>>>24;this.noise=s.createTexture(),s.bindTexture(s.TEXTURE_3D,this.noise),s.pixelStorei(s.UNPACK_ALIGNMENT,1),s.texImage3D(s.TEXTURE_3D,0,s.R8,t,t,t,0,s.RED,s.UNSIGNED_BYTE,o);for(let h of[s.TEXTURE_WRAP_S,s.TEXTURE_WRAP_T,s.TEXTURE_WRAP_R])s.texParameteri(s.TEXTURE_3D,h,s.REPEAT);s.texParameteri(s.TEXTURE_3D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_3D,s.TEXTURE_MAG_FILTER,s.LINEAR);let n=e.tMax??4700;this.bb=this.lut(G(K,500,6e4,n),K,!0);let{table:u}=C(k,e.spin,e.diskOuter),c=new Float32Array(k*4);u.forEach((h,f)=>c[f*4]=h),this.temp=this.lut(c,k,!1)}program(r){let e=this.gl,s=(n,u)=>{let c=e.createShader(n);if(e.shaderSource(c,u),e.compileShader(c),!e.getShaderParameter(c,e.COMPILE_STATUS))throw new Error(e.getShaderInfoLog(c)??"shader error");return c},t=e.createProgram();if(e.attachShader(t,s(e.VERTEX_SHADER,N)),e.attachShader(t,s(e.FRAGMENT_SHADER,r)),e.linkProgram(t),!e.getProgramParameter(t,e.LINK_STATUS))throw new Error(e.getProgramInfoLog(t)??"link error");let o=new Map,i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let n=0;n<i;n++){let u=e.getActiveUniform(t,n);o.set(u.name,e.getUniformLocation(t,u.name))}return{p:t,u:o}}lut(r,e,s){let t=this.gl,o=t.createTexture();t.bindTexture(t.TEXTURE_2D,o);let i=new Uint16Array(r.length);for(let n=0;n<r.length;n++)i[n]=ut(r[n]);return t.texImage2D(t.TEXTURE_2D,0,t.RGBA16F,e,1,0,t.RGBA,t.HALF_FLOAT,i),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),o}target(r,e,s,t){let o=this.gl,i=o.createFramebuffer();o.bindFramebuffer(o.FRAMEBUFFER,i);let n=[];for(let u=0;u<s;u++){let c=o.createTexture();o.bindTexture(o.TEXTURE_2D,c),o.texStorage2D(o.TEXTURE_2D,1,o.RGBA16F,r,e),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,t?o.LINEAR:o.NEAREST),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,t?o.LINEAR:o.NEAREST),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+u,o.TEXTURE_2D,c,0),n.push(c)}return o.drawBuffers(n.map((u,c)=>o.COLOR_ATTACHMENT0+c)),{fb:i,tex:n,w:r,h:e}}free(r){r&&(this.gl.deleteFramebuffer(r.fb),r.tex.forEach(e=>this.gl.deleteTexture(e)))}resize(r,e){let s=this.opts.pixelRatio,t=Math.max(16,Math.round(r*s)),o=Math.max(16,Math.round(e*s));if(t===this.w&&o===this.h)return;this.w=t,this.h=o,this.canvas.width=t,this.canvas.height=o,[this.hi,this.hdr,...this.down,...this.up].forEach(u=>this.free(u)),this.hi=this.target(t,o,3,!1),this.hdr=this.target(t,o,1,!0),this.down=[],this.up=[];let i=t,n=o;for(let u=0;u<V;u++)i=Math.max(1,i>>1),n=Math.max(1,n>>1),this.down.push(this.target(i,n,1,!0)),this.up.push(this.target(i,n,1,!0));this.makeLive(),this.band=Math.max(8,Math.ceil(o/40))}makeLive(){this.free(this.live);let r=this.opts.liveScale;this.live=this.target(Math.max(8,Math.round(this.w*r)),Math.max(8,Math.round(this.h*r)),3,!0),this.liveValid=!1,this.hiValid=!1,this.hiRow=0}setCamera(r){let e=this.opts.spin,s=Math.PI/180,t=z(r.r,r.th*s,r.ph*s,e),o=w([-t[0],-t[1],-t[2]]),i=[0,0,1],n=[o[1]*i[2]-o[2]*i[1],o[2]*i[0]-o[0]*i[2],o[0]*i[1]-o[1]*i[0]];n=w(n);let u=[n[1]*o[2]-n[2]*o[1],n[2]*o[0]-n[0]*o[2],n[0]*o[1]-n[1]*o[0]],c=Math.cos(r.look*s),h=Math.sin(r.look*s),f=[c*o[0]+h*n[0],c*o[1]+h*n[1],c*o[2]+h*n[2]],d=[c*n[0]-h*o[0],c*n[1]-h*o[1],c*n[2]-h*o[2]],l=Math.cos(r.roll*s),g=Math.sin(r.roll*s),x=[l*u[0]+g*d[0],l*u[1]+g*d[1],l*u[2]+g*d[2]],m=q(t,e,f,x),T=this.w/this.h;this.camU={uPos:m.pos,uER:m.eR,uEU:m.eU,uEF:m.eF,uL:m.l,uF:m.f,uAlpha:m.alpha,uFov:r.fov*Math.max(1,.95/T),uShift:[(r.ax-.5)*2*T,(.5-r.ay)*2]}}uniforms(r,e){let s=this.gl;for(let[t,o]of Object.entries(e)){let i=r.u.get(t);i!=null&&(typeof o=="number"?t==="uMaxSteps"?s.uniform1i(i,o):s.uniform1f(i,o):Array.isArray(o)&&(o.length===2?s.uniform2f(i,o[0],o[1]):s.uniform3f(i,o[0],o[1],o[2])))}}bindTex(r,e,s,t,o=this.gl.TEXTURE_2D){let i=this.gl;i.activeTexture(i.TEXTURE0+s),i.bindTexture(o,t);let n=r.u.get(e);n&&i.uniform1i(n,s)}trace(r,e,s,t){let o=this.gl,i=this.progs.trace;o.bindFramebuffer(o.FRAMEBUFFER,r.fb),o.viewport(0,0,r.w,r.h),o.enable(o.SCISSOR_TEST),o.scissor(0,e,r.w,s),o.useProgram(i.p),this.uniforms(i,{...this.camU,uRes:[r.w,r.h],uA:this.opts.spin,uRh:1+Math.sqrt(1-this.opts.spin**2),uRin:this.rIn,uRout:this.opts.diskOuter,uHFac:t?.05:.08,uMaxSteps:t?420:260,uJet:0}),o.drawArrays(o.TRIANGLES,0,3),o.disable(o.SCISSOR_TEST)}frame(r,e,s){if(this.lost||!this.w)return!1;let t=this.gl;t.bindVertexArray(this.vao);let o=this.lastFrame?r-this.lastFrame:16;this.lastFrame=r;let i=[e.r.toPrecision(5),e.th.toFixed(2),e.ph.toFixed(2),e.fov.toFixed(4),e.roll.toFixed(2),e.look.toFixed(2),e.ax.toFixed(4),e.ay.toFixed(4)].join(),n=i!==this.camKey;if(n&&(this.camKey=i,this.setCamera(e),this.liveValid=!1,this.hiValid=!1,this.hiRow=0),!this.liveValid)this.trace(this.live,0,this.live.h,!1),this.liveValid=!0,n&&o<400&&(this.frames++,o>40&&this.slowFrames++,this.frames>=24&&(this.slowFrames>12&&this.opts.liveScale>.2&&(this.opts.liveScale=Math.max(.2,this.opts.liveScale*.8),this.frames=this.slowFrames=0,this.makeLive(),this.setCamera(e),this.trace(this.live,0,this.live.h,!1),this.liveValid=!0),this.frames=this.slowFrames=0));else if(!this.hiValid){o>50?this.band=Math.max(8,Math.floor(this.band*.6)):o<22&&(this.band=Math.min(this.h,Math.ceil(this.band*1.25)));let x=Math.min(this.band,this.h-this.hiRow);this.trace(this.hi,this.hiRow,x,!0),this.hiRow+=x,this.hiRow>=this.h&&(this.hiValid=!0)}let u=this.hiValid?this.hi:this.live,c=`${i}|${this.hiValid}`;if(!s&&c===this.lastShadeKey)return!this.hiValid;this.lastShadeKey=c;let h=this.progs.shade;t.bindFramebuffer(t.FRAMEBUFFER,this.hdr.fb),t.viewport(0,0,this.w,this.h),t.useProgram(h.p),u.tex.forEach((x,m)=>this.bindTex(h,`uG${m}`,m,x)),this.bindTex(h,"uBB",3,this.bb),this.bindTex(h,"uTemp",4,this.temp),this.bindTex(h,"uNoise",5,this.noise,t.TEXTURE_3D),this.uniforms(h,{uRes:[this.w,this.h],uTime:s?r/1e3:0,uA:this.opts.spin,uRin:this.rIn,uRout:this.opts.diskOuter,uTmax:this.opts.tMax??4700,uTComp:.5,uLumExp:.55,uExposure:1.15,uFov:this.camU.uFov,uJetGain:0}),t.drawArrays(t.TRIANGLES,0,3);let f=this.progs.down,d=this.progs.up;t.useProgram(f.p);let l=this.hdr;for(let x of this.down)t.bindFramebuffer(t.FRAMEBUFFER,x.fb),t.viewport(0,0,x.w,x.h),this.bindTex(f,"uSrc",0,l.tex[0]),this.uniforms(f,{uDst:[x.w,x.h],uTexel:[1/l.w,1/l.h]}),t.drawArrays(t.TRIANGLES,0,3),l=x;t.useProgram(d.p),l=this.down[V-1];for(let x=V-2;x>=0;x--){let m=this.up[x];t.bindFramebuffer(t.FRAMEBUFFER,m.fb),t.viewport(0,0,m.w,m.h),this.bindTex(d,"uSrc",0,l.tex[0]),this.bindTex(d,"uBase",1,this.down[x].tex[0]),this.uniforms(d,{uDst:[m.w,m.h],uTexel:[.5/l.w,.5/l.h]}),t.drawArrays(t.TRIANGLES,0,3),l=m}let g=this.progs.comp;return t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,this.w,this.h),t.useProgram(g.p),this.bindTex(g,"uHdr",0,this.hdr.tex[0]),this.bindTex(g,"uBloom",1,l.tex[0]),this.uniforms(g,{uRes:[this.w,this.h],uBloomAmt:.075,uDim:e.dim,uSeed:r%1e3*.37}),t.drawArrays(t.TRIANGLES,0,3),!0}dispose(){[this.hi,this.hdr,this.live,...this.down,...this.up].forEach(r=>this.free(r)),this.gl.getExtension("WEBGL_lose_context")?.loseContext()}};function ut(a){let r=new Float32Array(1),e=new Uint32Array(r.buffer);r[0]=a;let s=e[0],t=s>>16&32768,o=(s>>23&255)-127+15,i=s&8388607;return o<=0?t:o>=31?t|31743:t|o<<10|i>>13}var ct=`precision highp float;
uniform vec2 uRes;uniform float uTime,uFov;uniform vec3 uPos;uniform mat3 uCam;uniform vec2 uShift;
const float RIN=1.35,ROUT=26.;
float hash(vec3 p){p=fract(p*.3183099+.1);p*=17.;return fract(p.x*p.y*p.z*(p.x+p.y+p.z));}
float vn(vec3 x){vec3 i=floor(x),f=fract(x);f=f*f*(3.-2.*f);
  return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),
             mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);}
float fbm(vec3 p){float a=.5,s=0.;for(int i=0;i<4;i++){s+=a*vn(p);p=p*2.03+vec3(7.1,3.3,1.7);a*=.5;}return s;}
vec3 heat(float x){vec3 c=mix(vec3(.22,.015,.006),vec3(.86,.2,.03),smoothstep(.18,.5,x));c=mix(c,vec3(1.,.55,.15),smoothstep(.45,.75,x));
  c=mix(c,vec3(1.,.9,.7),smoothstep(.7,1.05,x));return mix(c,vec3(.74,.84,1.),smoothstep(1.05,1.6,x));}
float streak(float lr,float ph,float sd){vec3 q=vec3(lr*10.+sd,cos(ph)*2.5,sin(ph)*2.5);float n=fbm(q);n=1.-abs(2.*n-1.);n*=n;
  float c=fbm(q*vec3(.3,.6,.6)+11.+sd);return n*n*(.3+2.4*c*c);}
vec4 disk(vec3 c,float lz){float r=length(c.xy);if(r<RIN||r>ROUT)return vec4(0.);
  float lr=log(r),om=sqrt(.5/pow(max(r,1.7),3.)),ph=atan(c.y,c.x)+2.4*lr;
  const float P=26.;float t1=fract(uTime/P),t2=fract(uTime/P+.5),w=abs(2.*t1-1.);
  float f=mix(streak(lr,ph+om*(t1-.5)*P*2.2,0.),streak(lr,ph+om*(t2-.5)*P*2.2,5.7),w);
  float g=sqrt(max(.03,1.-1.5/max(r,1.56)))/(1.+om*lz);
  float e=smoothstep(RIN,3.1,r)*pow(r/3.,-1.75)*smoothstep(ROUT,ROUT*.42,r);
  float I=e*(.035+5.*f)*pow(g,3.);
  vec3 col=heat(pow(g,1.1)*pow(r/3.,-.42)*1.02)*I;
  return vec4(col,clamp(e*(.3+3.*f)*1.4,0.,.97));}
vec3 stars(vec3 d){vec3 p=d*150.,i=floor(p);float h=hash(i);if(h<.988)return vec3(0.);vec3 f=fract(p)-.5;float m=(h-.988)/.012;
  return mix(vec3(1.,.85,.7),vec3(.75,.85,1.),hash(i+3.))*smoothstep(.22,0.,length(f))*(.25+m*m*1.4);}
void main(){vec2 uv=(gl_FragCoord.xy*2.-uRes)/uRes.y-uShift;
  vec3 d=normalize(uCam*vec3(uv*uFov,1.)),p=uPos,d0=d;float tr=1.;vec3 col=vec3(0.);bool cap=false,miss=false;
  float rc=length(p);
  if(rc>40.){float b=dot(p,d),q=b*b-rc*rc+38.*38.;
    if(q<0.||b>0.){miss=true;vec3 n=p-d*b;float bl=length(n);d=normalize(d-n/bl*(2./bl));}else p+=d*(-b-sqrt(q));}
  if(!miss){vec3 hv=cross(p,d);float h2=dot(hv,hv),lz=hv.z;
    for(int i=0;i<240;i++){float r2=dot(p,p),r=sqrt(r2);if(r<1.){cap=true;break;}if(r>40.&&dot(p,d)>0.)break;
      float dt=r*mix(.04,.1,smoothstep(3.,16.,r));vec3 a=-1.5*h2*p/(r2*r2*r);d+=a*dt*.5;vec3 np=p+d*dt;
      if(p.z*np.z<0.){vec4 s=disk(p+(np-p)*(p.z/(p.z-np.z)),lz);col+=tr*s.rgb;tr*=1.-s.a;if(tr<.02)break;}
      p=np;r2=dot(p,p);r=sqrt(r2);a=-1.5*h2*p/(r2*r2*r);d+=a*dt*.5;}}
  if(!cap)col+=tr*stars(normalize(d))*.7;
  col*=1.25;col=clamp((col*(2.51*col+.03))/(col*(2.43*col+.59)+.14),0.,1.);
  vec2 v=gl_FragCoord.xy/uRes-.5;col*=1.-.55*dot(v,v);
  gl_FragColor=vec4(col,1.);}`,_=class{constructor(r){let e=r.getContext("webgl",{antialias:!1,alpha:!1});if(!e)throw new Error("WebGL unavailable");this.gl=e,this.canvas=r;let s=(i,n)=>{let u=e.createShader(i);if(e.shaderSource(u,n),e.compileShader(u),!e.getShaderParameter(u,e.COMPILE_STATUS))throw new Error(e.getShaderInfoLog(u));return u},t=e.createProgram();if(e.attachShader(t,s(e.VERTEX_SHADER,"attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}")),e.attachShader(t,s(e.FRAGMENT_SHADER,ct)),e.linkProgram(t),!e.getProgramParameter(t,e.LINK_STATUS))throw new Error("link");e.useProgram(t),e.bindBuffer(e.ARRAY_BUFFER,e.createBuffer()),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),e.STATIC_DRAW);let o=e.getAttribLocation(t,"a");e.enableVertexAttribArray(o),e.vertexAttribPointer(o,2,e.FLOAT,!1,0,0),this.U={};for(let i of["uRes","uTime","uFov","uPos","uCam","uShift"])this.U[i]=e.getUniformLocation(t,i);this.scale=.75,this.lost=!1,r.addEventListener("webglcontextlost",i=>{i.preventDefault(),this.lost=!0})}resize(r,e){this.cw=r,this.ch=e,this.canvas.width=Math.max(2,Math.round(r*this.scale)),this.canvas.height=Math.max(2,Math.round(e*this.scale))}frame(r,e,s){let t=this.gl,o=Math.PI/180,i=e.r/2,n=Math.sin(e.th*o),u=[i*n*Math.cos(e.ph*o),i*n*Math.sin(e.ph*o),i*Math.cos(e.th*o)],c=v=>{let b=Math.hypot(v[0],v[1],v[2]);return v.map(J=>J/b)},h=(v,b)=>[v[1]*b[2]-v[2]*b[1],v[2]*b[0]-v[0]*b[2],v[0]*b[1]-v[1]*b[0]],f=c(u.map(v=>-v)),d=c(h(f,[0,0,1])),l=h(d,f),g=Math.cos(e.look*o),x=Math.sin(e.look*o),m=f.map((v,b)=>g*v+x*d[b]),T=d.map((v,b)=>g*v-x*f[b]),U=Math.cos(e.roll*o),D=Math.sin(e.roll*o),Y=T.map((v,b)=>v*U+l[b]*D),Z=l.map((v,b)=>v*U-T[b]*D),L=this.cw/this.ch;return t.viewport(0,0,this.canvas.width,this.canvas.height),t.uniform2f(this.U.uRes,this.canvas.width,this.canvas.height),t.uniform1f(this.U.uTime,s?r/1e3:0),t.uniform1f(this.U.uFov,e.fov*Math.max(1,.95/L)),t.uniform3fv(this.U.uPos,u),t.uniformMatrix3fv(this.U.uCam,!1,[...Y,...Z,...m]),t.uniform2f(this.U.uShift,(e.ax-.5)*2*L,(.5-e.ay)*2),t.drawArrays(t.TRIANGLES,0,3),this.canvas.style.opacity=e.dim.toFixed(3),!0}};return ot(ht);})();
