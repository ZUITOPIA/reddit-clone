module.exports = {
  plugins: ["tailwindcss", "postcss-preset-env"],
};

// PostCSS 란?
// JS플러그인을 사용하여 CSS를 변환시키는 툴
// 언어가 아니라 자동으로 현대적인 CSS를 호환 가능하도록 변환시켜주는 플러그인일 뿐
// CSS에 문제가 없는지 미리 확인해서 에러 로그를 줌
// PostCSS 자체는 아무 일도 하지 않음, 다만 플러그인과 플러그인을 추가할 수 있는 환경을 제공함.
