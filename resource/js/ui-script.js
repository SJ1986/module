'use strict';
/** common */
(function ($) {
  var $win = $(window);
  var $doc = $(document);

  function uiJSCommon($root) {
    if (!$root) {
      $root = $doc;
    }

    searchFn(); /** search - common */
    uxScrollSyc();
    switchMode(); /** dark | light switch mode */
  }

  function searchFn() {
    var temp;
    $('.elem-sch-common__input').keyup(function () {
      content = $(this).val();
      temp = $(".ui-article-item:contains('" + content + "')");
    });
    $('.elem-sch-common__btn').click(function () {
      var offset = $(temp).offset(); //선택한 태그의 위치를 반환
      //animate()메서드를 이용해서 선택한 태그의 스크롤 위치를 지정해서 0.4초 동안 부드럽게 해당 위치로 이동함
      $('html').animate({ scrollTop: offset.top }, 200);
    });

    $('.elem-sch-common__input').on('keyup', function (key) {
      if (key.keyCode == 13) {
        $('.elem-sch-common__btn').trigger('click');
      }
    });
  }

  function switchMode() {
    let toggleBtn = document.getElementById('toggle-btn');
    let body = document.body;
    let darkMode = localStorage.getItem('dark-mode');
    const enableDarkMode = () => {
      toggleBtn.classList.replace('fa-sun', 'fa-moon');
      body.classList.add('light');
      localStorage.setItem('dark-mode', 'enabled');
    };
    const disableDarkMode = () => {
      toggleBtn.classList.replace('fa-moon', 'fa-sun');
      body.classList.remove('light');
      localStorage.setItem('dark-mode', 'disabled');
    };
    if (darkMode === 'enabled') {
      enableDarkMode();
    }
    toggleBtn.onclick = (e) => {
      darkMode = localStorage.getItem('dark-mode');
      if (darkMode === 'disabled') {
        enableDarkMode();
      } else {
        disableDarkMode();
      }
    };
  }

  //스크롤 인터렉션 : gnb 위치
  function uxScrollSyc() {
    const HEADER = document.querySelector('header'); //top메뉴

    var prevScrollpos = 0, //previous position
      currentScrollPos = 0, //current position
      headH; //GNB height

    //header
    if (HEADER) {
      headH = HEADER.clientHeight;
      $('body').css('padding-top', headH + 'px');
    }

    // GNB : 스크롤 연동 시작
    window.addEventListener('scroll', function (event) {
      currentScrollPos = document.documentElement.scrollTop;
      //console.log ("이전 : "+ prevScrollpos +' / '+ "현재 : "+ currentScrollPos)
      if (prevScrollpos > currentScrollPos) {
        //위로 올릴때
        if (HEADER) {
          HEADER.style.top = '0';
          HEADER.classList.add('scroll-up');
          HEADER.classList.remove('scroll-down');
        }
      } else {
        //아래로 내릴때
        if (HEADER) {
          HEADER.style.top = -headH + 'px';
          HEADER.classList.add('scroll-down');
          HEADER.classList.remove('scroll-up');
        }
      }
      if (currentScrollPos < 5) {
        if (HEADER) {
          HEADER.style.top = '0';
        }
      }
      //console.log ("이전 : "+ prevScrollpos +' / '+ "현재 : "+ currentScrollPos)
      prevScrollpos = currentScrollPos;
    });
    return prevScrollpos;
  }
  window.uiJSCommon = uiJSCommon;

  // dom ready *****************************
  $(function () {
    uiJSCommon();
  });
})(jQuery);
/** /common */

/** component */
$(function () {
  $('.elem-sch-common__label').hover(function () {
    $(this).toggleClass('elem-sch-hover');
  });
});
