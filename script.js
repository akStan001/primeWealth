document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    mobileMenuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        this.innerHTML = mainNav.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqCard = question.closest('.faq-card');
            const isActive = faqCard.classList.contains('active');
            
            // Close all FAQs
            document.querySelectorAll('.faq-card').forEach(card => {
                card.classList.remove('active');
            });
            
            // Open clicked one if it wasn't active
            if (!isActive) {
                faqCard.classList.add('active');
            }
        });
    });
    
    // Initialize first FAQ as open
    document.querySelector('.faq-card').classList.add('active');
    
    // Form Submission
      signupForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;

    try {
        // 1. Collect all form data
        const formData = {
            name: form.full_name.value,
            email: form.email.value,
            phone: form.phone.value,
            investmentPlan: form.investment_plan.options[form.investment_plan.selectedIndex].text,
            investmentAmount: form.investment_amount.value,
            paymentMethod: form.payment_method.value,
            signupDate: new Date().toLocaleString()
        };

        // 2. Prepare creative ASCII art email content
        const emailContent = `
✨💼 NEW INVESTMENT ALERT 💼✨
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ╭───────────────────────────────╮
  │                               │
  │   PRIMEGROWTH INVESTMENTS     │
  │                               │
  ╰───────────────────────────────╯

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔥 INVESTOR PROFILE 🔥
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

◈ NAME: ${formData.name}
◈ EMAIL: ${formData.email}
◈ PHONE: ${formData.phone}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💰 INVESTMENT DETAILS 💰
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

◈ PLAN: ${formData.investmentPlan}
◈ AMOUNT: $${formData.investmentAmount}
◈ METHOD: ${formData.paymentMethod}
◈ DATE: ${formData.signupDate}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📈 POTENTIAL RETURNS 📈
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

◈ 90-DAY PROJECTION: $${calculateProjection(formData.investmentAmount, formData.investmentPlan)}
◈ EST. ROI: ${getROIPercentage(formData.investmentPlan)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 ACTION REQUIRED 🚀
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Please contact ${formData.name} within 24 hours to complete onboarding!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💎 Thank you for choosing PrimeGrowth! 💎
`;

        // 3. Send to FormSubmit
        const response = await fetch('https://formsubmit.co/ajax/akeemgbolahan58@gmail.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                _subject: `🚀 New Investment: ${formData.name} - $${formData.investmentAmount}`,
                _template: "box",
                _replyto: formData.email,
                _autoresponse: generateAutoresponse(formData),
                message: emailContent
            })
        });

        // 4. Redirect to thank-you page
        if (response.ok) {
            window.location.href = `thank-you.html?${new URLSearchParams(formData).toString()}`;
        } else {
            throw new Error('Form submission failed');
        }

    } catch (error) {
        alert("Error submitting form. Please try again.");
        console.error(error);
    } finally {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    }
});

// Helper functions
function calculateProjection(amount, plan) {
    const plans = {
        "200": amount * 1.15,  // Starter 15%
        "1000": amount * 1.22, // Premium 22%
        "5000": amount * 1.30  // VIP 30%
    };
    const key = plan.includes("Starter") ? "200" : plan.includes("Premium") ? "1000" : "5000";
    return Math.round(plans[key]).toLocaleString();
}

function getROIPercentage(plan) {
    return plan.includes("Starter") ? "15%" :
           plan.includes("Premium") ? "22%" : "30%";
}

function generateAutoresponse(data) {
    return `Dear ${data.name},\n\nThank you for your investment of $${data.investmentAmount}!\n\n💰 Potential 90-day return: $${calculateProjection(data.investmentAmount, data.investmentPlan)}\n\nOur team will contact you within 24 hours.\n\nTo your financial success,\nThe PrimeGrowth Team`;
} 
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });

     
    // Validate investment amount
    
    
    // Auto-select investment plan based on amount
  function updateInvestmentPlan(amount) {
    const planSelect = document.getElementById('investment_plan');
    amount = parseInt(amount) || 200;
    
    if (amount >= 5000) {
        planSelect.value = "5000";
    } else if (amount >= 1000) {
        planSelect.value = "1000";
    } else {
        planSelect.value = "200";
    }
}
   
    
    // Set up event listeners for investment amount
    const amountInput = document.getElementById('investment_amount');
    if (amountInput) {
        amountInput.addEventListener('input', validateInvestmentAmount);
        amountInput.addEventListener('change', validateInvestmentAmount);
    }
});