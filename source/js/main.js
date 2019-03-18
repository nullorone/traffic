var offerDescription = document.querySelector('.offer__descr');

var typesCountdown = ['seconds', 'minutes', 'hours', 'days'];

var COUNTDOWN_ELEMENTS = 4;

var removePromoForms = function() {
  var promoForms = document.querySelectorAll('.promo-form');
  promoForms.forEach(function(form) {
    form.remove();
  });
};

var changeOfferText = function() {
  offerDescription.innerHTML = 'Предложение закончилось!' + '<br />' + 'Вы не успели ;(';
};

var countdownStop = function() {
  removePromoForms();
  changeOfferText();
};

var getTranslateTime = function(type) {
  var typesTimes = {
    'days': 'дней',
    'hours': 'часов',
    'minutes': 'минут',
    'seconds': 'секунд'
  }

  return typesTimes[type];
};

var getCountdownPluginType = function (type) {
  var typesCountdownPlugin = {
    'days': '{dn}',
    'hours': '{hn}',
    'minutes': '{mn}',
    'seconds': '{sn}'
  }

  return typesCountdownPlugin[type];
};

var createElementCountdown = function(type) {
  var element = document.createElement('li');
  element.classList.add('countdown__item');
  var input = document.createElement('input');
  input.classList.add('countdown__input');
  input.type = 'text';
  input.name = 'countdown-' + type;
  input.id = 'countdown-' + type;
  input.defaultValue = getCountdownPluginType(type);
  input.readOnly = true;
  var label = document.createElement('label');
  label.classList.add('countdown__label');
  label.htmlFor = 'countdown-' + type;
  label.textContent = getTranslateTime(type);
  element.appendChild(input);
  element.appendChild(label);

  return element;
};

var generateCountdown = function() {
  var fragment = document.createDocumentFragment();
  for (var i = COUNTDOWN_ELEMENTS - 1; i >= 0; i--) {
    fragment.appendChild(createElementCountdown(typesCountdown[i]));
  }

  return fragment;
};

var createCountdownNode = function() {
  var countdownNode = document.createElement('ul');
  countdownNode.classList.add('offer-form__countdown');
  countdownNode.classList.add('countdown');
  countdownNode.appendChild(generateCountdown());

  return countdownNode;
};

var pluginLayout;

var includeCountdown = function () {
  var countdownWrapper = document.querySelector('.countdown-wrapper');
  countdownWrapper.appendChild(createCountdownNode());
  pluginLayout = document.querySelector('.countdown').outerHTML;
  document.querySelector('.countdown').remove();
 };

includeCountdown();


$('.countdown-wrapper').countdown({
  until: '+9h +34m +59s',
  layout: pluginLayout,
  onExpiry: countdownStop
});

