function retina() {
    const picture = document.getElementById('picture');
    if (window.devicePixelRatio > 1) {
        picture.setAttribute('src', 'img/johannes-ludwig-348591-unsplash@2x.png');
    }
}

document.addEventListener('DOMContentLoaded', retina);

const pin = document.getElementById('pin');

function show() {
    const detail = document.getElementById('detail');
    if( detail.style.display !== 'flex' ) {
        pin.setAttribute('style', 'margin: 0');
        detail.setAttribute('style', 'display: flex');
        console.log(detail.style.display);
    }
}

pin.addEventListener('focus', show);
