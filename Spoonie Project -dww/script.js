document.addEventListener('DOMContentLoaded', function() {
    console.log('Spoonie Welcome Page Loaded');
    
    let countdown = 5;
    const countdownElement = document.getElementById('countdown-number');
    let countdownInterval;
    
    function updateCountdown() {
        countdownElement.textContent = countdown;
        countdown--;
        if (countdown < 0) {
            clearInterval(countdownInterval);
            navigateToHome();
        }
    }
    
    function navigateToHome() {
        document.querySelector('.countdown').textContent = 'Going to homepage...';
        setTimeout(function() {
            window.location.href = 'home.html';
        }, 300);
    }
    
    countdownInterval = setInterval(updateCountdown, 1000);
    
    document.addEventListener('click', function() {
        clearInterval(countdownInterval);
        countdownElement.textContent = '0';
        navigateToHome();
    });
    
    document.addEventListener('keydown', function() {
        clearInterval(countdownInterval);
        countdownElement.textContent = '0';
        navigateToHome();
    });
    
    const welcomeImage = document.querySelector('.welcome-image');
    welcomeImage.addEventListener('error', function() {
        console.error('Image loading failed, please check path: images/welcome.jpg');
        this.alt = 'Spoonie welcome image';
        const container = this.parentElement;
        const errorMsg = document.createElement('div');
        errorMsg.style.cssText = `
            color: #666;
            font-size: 14px;
            text-align: center;
            padding: 20px;
        `;
        errorMsg.textContent = 'Image loading...';
        container.appendChild(errorMsg);
    });
    
    welcomeImage.addEventListener('load', function() {
        console.log('Welcome image loaded successfully');
    });
});