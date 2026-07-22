/**
 * Dental Implant DB Landing Page - Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const dbForm = document.getElementById('implantDbForm');
  const nameInput = document.getElementById('userName');
  const ageInput = document.getElementById('userAge');
  const phoneInput = document.getElementById('userPhone');
  const agreeTermsCheckbox = document.getElementById('agreeTerms');
  
  // Modals & Popups
  const termsModal = document.getElementById('termsModal');
  const successModal = document.getElementById('successModal');
  const btnTermsView = document.getElementById('btnTermsView');
  const btnCloseTerms = document.getElementById('btnCloseTerms');
  const btnCloseSuccess = document.getElementById('btnCloseSuccess');
  
  const rollingToast = document.getElementById('rollingToast');
  const rollingToastText = document.getElementById('rollingToastText');

  // Smooth scroll to DB Form
  window.scrollToForm = function() {
    const formElement = document.getElementById('dbFormSection');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        if (nameInput) nameInput.focus();
      }, 600);
    }
  };

  // Phone number input auto formatting (010-1234-5678)
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/[^0-9]/g, '');
      if (val.length > 11) val = val.slice(0, 11);
      
      if (val.length > 7) {
        e.target.value = `${val.slice(0, 3)}-${val.slice(3, 7)}-${val.slice(7)}`;
      } else if (val.length > 3) {
        e.target.value = `${val.slice(0, 3)}-${val.slice(3)}`;
      } else {
        e.target.value = val;
      }
    });
  }

  // Age input filter (only numbers, max 120)
  if (ageInput) {
    ageInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/[^0-9]/g, '');
      if (val.length > 3) val = val.slice(0, 3);
      e.target.value = val;
    });
  }

  // Terms Modal Toggle
  if (btnTermsView && termsModal && btnCloseTerms) {
    btnTermsView.addEventListener('click', (e) => {
      e.preventDefault();
      termsModal.classList.add('active');
    });

    btnCloseTerms.addEventListener('click', () => {
      termsModal.classList.remove('active');
    });

    termsModal.addEventListener('click', (e) => {
      if (e.target === termsModal) {
        termsModal.classList.remove('active');
      }
    });
  }

  // Success Modal Close
  if (successModal && btnCloseSuccess) {
    btnCloseSuccess.addEventListener('click', () => {
      successModal.classList.remove('active');
    });

    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        successModal.classList.remove('active');
      }
    });
  }

  // Form Submission Logic
  if (dbForm) {
    dbForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = nameInput.value.trim();
      const age = ageInput.value.trim();
      const phone = phoneInput.value.trim();
      const isAgreed = agreeTermsCheckbox.checked;

      if (!name) {
        alert('이름을 입력해 주세요.');
        nameInput.focus();
        return;
      }

      if (!age || parseInt(age) < 18) {
        alert('올바른 나이를 입력해 주세요.');
        ageInput.focus();
        return;
      }

      if (!phone || phone.replace(/[^0-9]/g, '').length < 10) {
        alert('올바른 연락처 11자리를 입력해 주세요.');
        phoneInput.focus();
        return;
      }

      if (!isAgreed) {
        alert('개인정보 수집 및 이용 동의에 체크해 주세요.');
        agreeTermsCheckbox.focus();
        return;
      }

      // Successful lead capture
      document.getElementById('applicantNameDisplay').textContent = name;
      successModal.classList.add('active');

      // Reset form
      dbForm.reset();
    });
  }

  // 3-Second Rolling Applicant Toast Popup Logic
  const applicantList = [
    { name: '김*철', age: '61세', phone: '010-****-4821' },
    { name: '이*숙', age: '58세', phone: '010-****-9012' },
    { name: '박*호', age: '67세', phone: '010-****-3349' },
    { name: '최*영', age: '55세', phone: '010-****-1092' },
    { name: '정*훈', age: '64세', phone: '010-****-7731' },
    { name: '강*순', age: '62세', phone: '010-****-5512' },
    { name: '윤*석', age: '70세', phone: '010-****-8203' },
    { name: '장*희', age: '65세', phone: '010-****-6190' }
  ];

  let appIndex = 0;

  function triggerRollingToast() {
    if (!rollingToast || !rollingToastText) return;

    // Fade out current toast
    rollingToast.classList.remove('active');

    setTimeout(() => {
      appIndex = (appIndex + 1) % applicantList.length;
      const current = applicantList[appIndex];
      rollingToastText.textContent = `${current.name}(${current.age})님이 29만원 임플란트 상담을 신청하셨습니다.`;
      
      // Fade in new toast
      rollingToast.classList.add('active');
    }, 400);
  }

  // Initial show after 1s
  setTimeout(() => {
    if (rollingToast) rollingToast.classList.add('active');
  }, 1000);

  // Roll every 3 seconds (3000ms)
  setInterval(triggerRollingToast, 3000);
});
