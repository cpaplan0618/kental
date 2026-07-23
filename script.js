document.addEventListener('DOMContentLoaded', () => {
  const dbForm = document.getElementById('implantDbForm');
  const nameInput = document.getElementById('userName');
  const ageInput = document.getElementById('userAge');
  const phoneInput = document.getElementById('userPhone');
  const agreeTermsCheckbox = document.getElementById('agreeTerms');
  
  const termsModal = document.getElementById('termsModal');
  const btnTermsView = document.getElementById('btnTermsView');
  const btnCloseTerms = document.getElementById('btnCloseTerms');
  
  const rollingToast = document.getElementById('rollingToast');
  const rollingToastText = document.getElementById('rollingToastText');

  window.scrollToForm = function() {
    const formElement = document.getElementById('dbFormSection');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        if (nameInput) nameInput.focus();
      }, 600);
    }
  };

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

  if (ageInput) {
    ageInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/[^0-9]/g, '');
      if (val.length > 3) val = val.slice(0, 3);
      e.target.value = val;
    });
  }

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

  // Submit Handler -> Redirection to dedicated success.html
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

      // Store in Session Storage as fallback
      sessionStorage.setItem('applicant_name', name);
      sessionStorage.setItem('applicant_age', age);
      sessionStorage.setItem('applicant_phone', phone);

      // Redirect to dedicated success.html page
      const redirectUrl = `success.html?name=${encodeURIComponent(name)}&age=${encodeURIComponent(age)}&phone=${encodeURIComponent(phone)}`;
      window.location.href = redirectUrl;
    });
  }

  // 3-Second Rolling Applicant Toast Popup Logic
  const applicantList = [
    { name: '김*철', age: '61세' },
    { name: '이*숙', age: '58세' },
    { name: '박*호', age: '67세' },
    { name: '최*영', age: '55세' },
    { name: '정*훈', age: '64세' },
    { name: '강*순', age: '62세' },
    { name: '윤*석', age: '70세' },
    { name: '장*희', age: '65세' }
  ];

  let appIndex = 0;

  function triggerRollingToast() {
    if (!rollingToast || !rollingToastText) return;

    rollingToast.classList.remove('active');

    setTimeout(() => {
      appIndex = (appIndex + 1) % applicantList.length;
      const current = applicantList[appIndex];
      rollingToastText.textContent = `${current.name}(${current.age})님이 임플란트 상담 신청했습니다.`;
      rollingToast.classList.add('active');
    }, 400);
  }

  setTimeout(() => {
    if (rollingToast) rollingToast.classList.add('active');
  }, 1000);

  setInterval(triggerRollingToast, 3000);
});
