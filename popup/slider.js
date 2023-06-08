const onChange = (() => {
    const sliderLabelValue = document.querySelector('#slider-label-value');
    const slider = document.querySelector('#slider');
    
    sliderLabelValue.innerText = slider.value
    slider.oninput = function() {
        const changedValue = this.value;

        if (changedValue > 0)
            sliderLabelValue.innerText = '+' + this.value/slider.getAttribute('step');
        else
            sliderLabelValue.innerText = this.value/10;
    }
})()

document.querySelector('#slider').addEventListener('input', onChange);
