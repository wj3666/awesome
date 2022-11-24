const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  // important: true,
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily:{
      'sans': ['sans-serif'],
      'serif': ['Merriweather', 'serif'],
    },
    borderColor: theme => ({
      ...theme('colors'),
      DEFAULT: theme('colors.gray.300', 'currentColor'),
      'primary': '#3490dc',
      'secondary': '#ffed4a',
      'danger': '#e3342f',
      '222325':'#222325',
      'CFD0E466':"#CFD0E466",
    }),
    extend: {
      backgroundSize: {
        'auto': 'auto',
        'cover': 'cover',
        'contain': 'contain',
       '50%': '50%',
       '16': '4rem',
      },
      backgroundImage: {
        'loginbg-left': "url('/bg_left.png')",
        'email-logo': "url('/Vector.png')",
        "password-logo": "url('/Password-2.png')",
        "paymentbg-right":"url('/Paymentbg-right.png')",
        "bg-succeed":"url('/Bg-Succeed.png')"
      },
      backgroundPosition: {
        left: 'left',
        'left-2': 'center left 0.5rem'
      },
      inset: {
        '2/5': "90%",
        '3/5': "41.5 %",
      },
      colors: {
        'nb-green': '#2de09f',
        'nb-deep-green': '#18cc8a',
        'nb-black': '#1b1b21',
        'nb-72727A': '#72727A',
        'nb-0C0C0F': '#0C0C0F',
        'nb-F0F0F5': '#F0F0F5',
        'nb-EBEBF0': '#EBEBF0',
        'nb-FAB300': '#FAB300',
        'nb-F7F7FA': '#F7F7FA',
        'nb-FE5E73': '#FE5E73',
        'nb-F5F5F8': '#F5F5F8',
        'nb-505059': '#505059',
        'nb-96969E': '#96969E',
        'nb-DFDFE5': "#DFDFE5",
        'nb-282830': "#282830",
        'nb-FFF7E7': "#FFF7E7",
        'nb-1D9BF0': '#1D9BF0',
        'nb-7248B9': '#7248B9',
        'nb-1B1B21': '#1B1B21',
        'nb-0E0E12': '#0E0E12',
        'nb-363640': '#363640',
        'nb-1D1D24': '#1D1D24',
        'nb-14141A': '#14141A',
        'nb-0DD690': '#0DD690',
        'nb-F0B513': '#F0B513',
        'nb-16161C': '#16161C',
        'nb-222229': '#222229',
        'nb-A0A0A8': '#A0A0A8',
        'nb-address-grey': '#313466',
        'nb-dash-grey': '#ECEEF6',
        'nb-shadow': '#474AA0',
        'nb-sidebar-grey': "#222325",
        'nb-2F63AE': "#2F63AE",
        'nb-191919': "#191919",
        'nb-CFD0E44D': "#CFD0E44D",
        "nb-CFD0E466": "#CFD0E466",
        "nb-4C90FE": "#4C90FE",
        "nb-C8C8C8": "#C8C8C8",
        "nb-435893": "#435893",
        "nb-2E2F30": "#2E2F30",
        "nb-292A2D": "#292A2D",
        "ng-FFB400": "#FFB400",
        "nb-282829": "#282829",
        "nb-121212": "#121212",
        "nb-3DB39E": "#3DB39E",
        "nb-222325": "#222325",
        "nb-464546": "#464546"
      },
      textColor: {
        'primary': '#3490dc',
        'secondary': '#ffed4a',
        'danger': '#e3342f',
        "3DB39E": "#3DB39E",
        "safe": "white",
        "nb-F45D47": "#F45D47",
        "ng-FFB400":"#FFB400",
        "nb-282829":"#282829",
        "nb-121212":"#121212",
        "nb-3DB39E":"#3DB39E",
        "nb-222325":"#222325",
        "nb-464546":"#464546"
      },
      spacing: {
        '0.25': '0.0625rem',
        '0.75': '0.1875rem',
        '1.5': '0.375rem',
        '1.75': '0.4375rem',
        '2.25': '0.5625rem',
        '2.5': '0.625rem',
        '2.75': '0.6875rem',
        '3.25': '0.8125rem',
        '3.5': '0.875rem',
        '3.75': '0.9375rem',
        '3.875': '0.96875rem',
        '4.25': '1.0625rem',
        '4.375': '1.09375rem',
        '4.5': '1.125rem',
        '4.7': '1.175rem',
        '4.75': '1.1875rem',
        '5': '1.25rem',
        '5.25': '1.3125rem',
        '5.5': '1.375rem',
        '5.75': '1.4375rem',
        '6.25': '1.5625rem',
        '6.5': '1.625rem',
        '6.75': '1.6875rem',
        '7.5': '1.875rem',
        '7.75': '1.9375rem',
        '8.5': '2.125rem',
        '8.75': '2.1875rem',
        '9': '2.25rem',
        '9.25': '2.3125rem',
        '9.5': '2.375rem',
        '10.5': '2.625rem',//42
        '11': '2.75rem',
        '12.5': '3.125rem',
        '13': '3.25rem',
        '13.25': '3.3125rem', //50
        '13.5': '3.375rem',
        '14': '3.5rem',
        '14.25': '3.5625rem',
        '14.5': '3.625rem',
        '14.75': '3.6875rem',
        '15': '3.75rem',
        '15.25': '3.8125rem',
        '15.5': '3.875rem',
        '16': '4rem',
        '17': '4.25rem',
        '17.5': '4.375rem',
        '18': '4.5rem',
        '18.25': '4.5625rem',
        '18.5': '4.625rem',
        '19': '4.75rem',
        '19.5': '4.875rem',
        '19.75': '4.9375rem',
        '20.5': '5.125rem',
        '21': '5.25rem',
        '21.5': '5.375rem',
        '22': '5.5rem',
        '22.5': '5.625rem',//90
        '23': '5.75rem',
        '23.25': '5.8125rem',
        '23.5': '5.875rem',
        '23.75': '5.93755rem',
        '24': '6rem',
        '24.25': '6.0625rem',
        '24.5': '5.375rem',
        '25': '6.25rem',
        '25.5': '6.375rem',
        '25.75': '6.4375rem',
        '26': '6.5rem',
        '26.5': '6.625rem',
        '26.75': '6.6875rem',
        '27': '6.75rem',
        '27.25': '6.8125rem',
        '27.5': '6.875rem',
        '27.75': '6.9375rem',
        '28.5': '7.125rem',
        '29': '7.25rem',
        '29.5': '7.375rem',
        '30': '7.5rem',//120
        '30.5': '7.625rem',
        '30.75': '7.6875rem',
        '31': '7.75rem',
        '31.5': '7.875rem',
        '31.25': '7.8125rem',
        '31.75': '7.9375rem',
        '32.5': '8.125rem',
        '32.75': '8.1875rem',
        '33': '8.25rem',
        '33.5': '8.375rem',
        '33.75': '8.4375rem',
        '34': '8.5rem',
        '34.5': '8.625rem',
        '34.75': '8.6875rem',
        '35': '8.75rem',
        '35.5': '8.875rem',
        '36.25': '9.0625rem',
        '36.5': '9.125rem',
        '37': '9.25rem',
        '37.25': '9.3125rem',
        '37.5': '9.375rem',
        '37.75': '9.4375rem',
        '38': '9.5rem',
        '38.125': '9.53125rem',
        '38.25': '9.5625rem',
        '38.5': '9.625rem',
        '39': '9.75rem',
        '39.5': '9.875rem',
        '40.5': '10.125rem',
        '41': '10.25rem',
        '41.25': '10.3125rem',
        '41.5': '10.375rem',
        '42': '10.5rem',
        '42.25': '10.5625rem',
        '42.5': '10.625rem',
        '43': '10.75rem',
        '43.5': '10.875rem',
        '43.75': '10.9375rem',
        '44.5': '11.125rem',
        '45': '11.25rem',
        '45.5': '11.375rem',
        '46': '11.5rem',
        '46.5': '11.625rem',
        '47': '11.75rem',
        '47.25': '11.8125rem',
        '47.5': '11.875rem',
        '47.75': '11.9375rem',
        '48.5': '12.125rem',
        '49': '12.25rem', //196
        '49.25': '12.3125rem',
        '49.5': '12.375rem',
        '50': '12.5rem',
        '50.5': '12.625rem',
        '50.75': '12.6875rem',
        '51': '12.75rem',
        '51.5': '12.875rem',
        '52.5': '13.125rem',
        '52.75': '13.1875rem',
        '53': '13.25rem',
        '53.25': '13.3125rem',
        '53.5': '13.375rem',
        '53.75': '13.4375rem',
        '54': '13.5rem',
        '54.5': '13.625rem',
        '55': '13.75rem',
        '55.5': '13.875rem',
        '55.75': '13.9375rem',
        '56.25': '14.0625rem',
        '57': '14.25rem',
        '57.5': '14.375rem',
        '57.75': '14.4375rem',
        '58': '14.5rem',
        '58.25': '14.5625rem',
        '58.5': '14.625rem',
        '59': '14.75rem',
        '59.25': '14.8125rem',
        '59.5': '14.875rem',
        '60': '15rem',
        '60.5': '15.125rem',
        '60.75': '15.1875rem',
        '61': '15.25rem',
        '61.25': '15.3125rem',
        '61.5': '15.375rem',
        '62': '15.5rem',//246.5
        '62.5': '15.625rem',
        '62.75': '15.6875rem',
        '63': '15.75rem',
        '63.5': '15.875rem',
        '64.5': '16.125rem',
        '65': '16.25rem',//256
        '65.5': '16.375rem',
        '66.5': '16.625rem',
        '67': '16.75rem',
        '67.25': '16.8125rem',
        '68': '17rem',
        '68.25': '17.0625rem',
        '69.5': '17.375rem',
        '70': '17.5rem',
        '70.5': '17.625rem',
        '70.75': '17.6875rem',
        '71': '17.75rem',
        '72': '18rem',
        '72.5': '18.125rem',
        '74': '18.5rem',//295
        '74.5': '18.625rem',//298
        '75.5': '18.875rem',
        '76': '19rem',
        '76.25': '19.0625rem',
        '76.5': '19.125rem',
        '78': '19.5rem',
        '78.5': '19.625rem',
        '81.5': '20.375rem',
        '82': '20.5rem',
        '82.5': '20.625rem',
        '82.75':'20.6875rem',
        '84': '21rem',
        '84.75': '21.1875rem',
        '85': '21.25rem',
        '85.5': '21.375rem',
        '87.5': '21.875rem',
        '88': '22rem',
        '89.25': '22.3125rem',
        '89.5': '22.375rem',
        '89.75': '22.4375rem',
        '90': '22.5rem',
        '90.5': '22.625rem',
        '91.25': '22.8125rem',
        '92': '23rem',
        '94.5': '23.625rem',
        '99.25': '24.8125rem',
        '100': '25rem',
        '103.5': '25.875rem',
        '104': '26rem',
        '106': '26.5rem',
        '106.5': '26.625rem',
        '107': '26.75rem',
        '107.5': '26.875rem',
        '108': '27rem',
        '110': '27.5rem',
        '111': '27.75rem',
        '116.25': '29.0625rem',
        '120': '30rem',
        '122': '30.5rem',
        '124': '31rem',
        '122.5': '30.625rem',
        '123': '30.75rem',
        '125': '31.25rem',
        '126': '31.5rem',
        '127': '31.75rem',
        '128': '32rem',
        '130': '32.5rem',
        '131': '32.75rem',
        '132': '33rem',
        '136': '34rem',
        '137': '34.25rem',
        '138.5': '34rem',
        '139': '34.75rem',
        '140': '35rem',
        '142': '35.5rem',
        '144': '36rem',
        '146': '36.5rem',
        '147': '36.75rem',
        '148': '37rem',
        '152': '38rem',
        '154': '38.3rem',
        '156': '39rem',
        '159': '39.75rem',
        '160': '40rem',
        '163': '40.75rem',
        '167': '41.75rem',
        '168': '42rem',
        '170.5': '42.625rem',
        '170.75': '42.6875rem',
        '172': '43rem',
        '175': '43.75rem',
        '179': '44.75rem',
        '180': '45rem',
        '181': '45.25rem',
        '183': '45.75rem',
        '183.5': '45.875rem',
        '186': '46.5rem',
        '187': '46.75rem',
        '187.5': '46.875rem',
        '192': '48rem',
        '195': '48.75rem',
        '199.5': '49.875rem',
        '200': '50rem',
        '201': '50.25rem',
        '203': '50.75rem',
        '207': '51.75rem',
        '208': '52rem',
        '212': '53rem',
        '215': '53.75rem',
        '216': '54rem',
        '219': '54.75rem',
        '220': '55rem',
        '223': '55.75rem',
        '224': '56.5rem',
        '225': '56.25rem',
        '226': '56.25rem',
        '227': '56.75rem',
        '228': '57rem',
        '240': '60rem',
        '247': '61.75rem',
        '248': '62rem',
        '249': '62.25rem',
        '252': '63rem',
        '256': '64rem',
        '260': '65rem',
        '264': '66rem',
        '268': '67rem',
        '271.5':'67.875rem',
        '272': '68rem',
        '274': '68.5rem',
        '276.5': '69.625rem',
        '280': '70rem',
        '281': '70.25rem',
        '288': '72rem',
        '292': '73rem',
        '295': '73.75rem',
        '296': '74rem',
        '300': '75rem',
        '320': '80rem',
        '328': '82rem',
        '335': '83.75rem',
        '350': '90rem',
        '376': '94rem',
        '408': '104rem',
        '415': '105rem',
        '430': "120rem",
        '500': '230rem',
      },
      transitionProperty: {
        'width': 'width',
        'height': 'height',
      },
      padding: {
        '1/2': '50%',
        full: '100%',
      },
      maxWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        '20': '5rem',
        '27.5': '6.875rem',
        '31.75': '7.9375rem',
        '36.75': '9.1875rem',
        '40': '10rem',
        '41': '10.25rem',
        '42': '10.5rem',
        '45': '11.25rem',
        '48.75': '12.1875rem',
        '72': '18.125rem',
        '97.5': '24.375rem',
        '100': '25rem',
        '126': '31.5rem',
        '140': '35rem',
        '160': '40rem',
      },
      height: {
        '1024': '65rem',
        '5/7': '80%'

      },
      maxHeight: {
        '26.5': '6.625rem',
      },
      minHeight: {
        '100': '25rem'
      },
      lineHeight: {
        '5.5': '1.375rem',
      },
      boxShadow: {
        'calendar': '0 4px 20px 0 rgba(0, 0, 0, 0.12)',
        'card': '0 2px 6px rgba(0, 0, 0, 0.5)',
      },
      borderRadius: {
        '0.75': '0.1875rem',
        '1': '0.25rem',
        '2.5': '0.625rem',
        '3.5': '0.875rem',
        '4.5': '1.125rem',
        '5': '1.25rem',
        '5.5': '1.375rem',
        '6': '1.5rem',
        '7': '1.75rem',
        '10': '2.5rem',
        '7': '1.75rem',
      },
      screens: {
        '400sc': '400px',
        '399sc-max': { 'max': '399px' },
        '428sc': '428px',
        '427sc-max': { 'max': '427px' },
        '520sc': '520px',
        '519sc-max': { 'max': '520px' },
        '640sc': '640px',
        '639sc-max': { 'max': '639px' },
        '744sc': '744px',
        '743sc-max': { 'max': '743px' },
        '834sc': '834px',
        '833sc-max': { 'max': '833px' },
        '1024sc': '1024px',
        '1023sc-max': { 'max': '1023px' },
        '1280sc': '1280px',
        '1279sc-max': { 'max': '1279px' },
        '1440sc': '1440px',
        '1439sc-max': { 'max': '1439px' },
        '1600sc': '1600px',
        '1599sc-max': { 'max': '1599px' },
        '1792sc': '1792px',
        '1791sc-max': { 'max': '1792px' },
        '1920sc': '1920px'
      },
      zIndex: {
        '100': 100,
      },
      opacity: {
        '12': '0.12',
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      const texts = {

        '.font-p12-FFFFFF-w400': { fontSize: '0.75rem', lineHeight: '1rem', color: '#FFFFFF', fontWeight: 400 },
        '.font-p12-A2A3BC-w500': { fontSize: '0.75rem', lineHeight: '1rem', color: '#A2A3BC', fontWeight: 500 },

        '.font-p13-C1C1C1-w600': { fontSize: '0.8125rem', lineHeight: '1.125rem', color: '#C1C1C1', fontWeight: 600 },
        '.font-p13-FFFFFF-w400': { fontSize: '0.8125rem', lineHeight: '1.125rem', color: '#FFFFFF', fontWeight: 400 },
        '.font-p13-A2A3BA-w400': { fontSize: '0.8125rem', lineHeight: '1.125rem', color: '#A2A3BA', fontWeight: 400 },
        '.font-p13-4C90FE-w400': { fontSize: '0.8125rem', lineHeight: '1.125rem', color: '#4C90FE', fontWeight: 400 },
        '.font-p13-4C90FE-w600': { fontSize: '0.8125rem', lineHeight: '1.125rem', color: '#4C90FE', fontWeight: 600 },
        '.font-p13-5FE483-w400': { fontSize: '0.8125rem', lineHeight: '1.125rem', color: '#5FE483', fontWeight: 400 },
        '.font-p13-CFD0E4-w400': { fontSize: '0.8125rem', lineHeight: '1.125rem', color: '#CFD0E4', fontWeight: 400 },
        '.font-p13-4C90FE-w600': { fontSize: '0.8125rem', lineHeight: '1.125rem', color: '#4C90FE', fontWeight: 600 },
        '.font-p13-4C90FE-w400': { fontSize: '0.8125rem', lineHeight: '1.125rem', color: '#4C90FE', fontWeight: 400 },

        '.font-p13-A2A3BC-w400': { fontSize: '0.8125rem', lineHeight: '1.125rem', color: '#A2A3BC', fontWeight: 400 },
        '.font-p13-191919-w700': { fontSize: '0.8125rem', lineHeight: '1.125rem', color: '#191919', fontWeight: 700 },
        '.font-p14-CFD0E4-w400': { fontSize: '0.875rem', lineHeight: '1.125rem', color: '#CFD0E4', fontWeight: 400 },
        '.font-p14-CFD0E4-w300': { fontSize: '0.875rem', lineHeight: '1.125rem', color: '#CFD0E4', fontWeight: 300 },
        '.font-p15-FFFFFF-w500': { fontSize: '0.9375rem', lineHeight: '1.15rem', color: '#ffffff', fontWeight: 500 },
        '.font-p15-E4E4E4-w400': { fontSize: '0.9375rem', lineHeight: '1.15rem', color: '#E4E4E4', fontWeight: 400 },
        '.font-p15-FFFFFF-w400': { fontSize: '0.9375rem', lineHeight: '1.15rem', color: '#ffffff', fontWeight: 400 },
        '.font-p15-C8C8C8-w400': { fontSize: '0.9375rem', lineHeight: '1.15rem', color: '#ffffff', fontWeight: 400 },
        '.font-p15-C8C8C8-w500': { fontSize: '0.9375rem', lineHeight: '1.15rem', color: '#ffffff', fontWeight: 500 },
        '.font-p15-CFD0E4-w500': { fontSize: '0.9375rem', lineHeight: '1.15rem', color: '#CFD0E4', fontWeight: 500 },
        '.font-p15-FAB300-w500': { fontSize: '0.9375rem', lineHeight: '1.15rem', color: '#F29D8F', fontWeight: 500 },
        '.font-p15-4C90FE-w500': { fontSize: '0.9375rem', lineHeight: '1.15rem', color: '#4C90FE', fontWeight: 500 },
        '.font-p15-A2A3BA-w400': { fontSize: '0.9375rem', lineHeight: '1.15rem', color: '#A2A3BA', fontWeight: 400 },

        '.font-p16-F9F9F9-w700': { fontSize: '1rem', lineHeight: '1.171875rem', color: '#F9F9F9', fontWeight: 700 },
        '.font-p16-A2A3BC-w400': { fontSize: '1rem', lineHeight: '1.171875rem', color: '#A2A3BC', fontWeight: 400 },
        '.font-p16-FFFFFF-w700': { fontSize: '1rem', lineHeight: '1.171875rem', color: '#FFFFFF', fontWeight: 700 },
        '.font-p16-222325-w700': { fontSize: '1rem', lineHeight: '1.171875rem', color: '#222325', fontWeight: 700 },
        '.font-p16-FFFFFF-w500': { fontSize: '1rem', lineHeight: '1.171875rem', color: '#FFFFFF', fontWeight: 500 },
        '.font-p16-FFFFFF-w600': { fontSize: '1rem', lineHeight: '1.171875rem', color: '#FFFFFF', fontWeight: 600 },
        '.font-p18-FFFFFF-w500': { fontSize: '1.125rem', lineHeight: '1.3125rem', color: '#FFFFFF', fontWeight: 500 },

        '.font-p20-FFFFFF-w700': { fontSize: '1.25rem', lineHeight: '1.75rem', color: '#FFFFFF', fontWeight: 700 },
        '.font-p20-FFFFFF-w400': { fontSize: '1.25rem', lineHeight: '1.75rem', color: '#FFFFFF', fontWeight: 400 },

        '.font-p20-4C90FE-w600': { fontSize: '1.25rem', lineHeight: '1.75rem', color: '#4C90FE', fontWeight: 700 },
        '.font-p20-FFFFFF-w700': { fontSize: '1.25rem', lineHeight: '1.75rem', color: '#FFFFFF', fontWeight: 700 },
        '.font-p24-FFFFFF-w600': { fontSize: '1.5rem', lineHeight: '1.75rem', color: '#FFFFFF', fontWeight: 600 },
        '.font-p26-FFFFFF-w700': { fontSize: '1.625rem', lineHeight: '2rem', color: '#FFFFFF',fontWeight: 700 },
        '.font-p26-FFFFFF-w400': { fontSize: '1.625rem', lineHeight: '2rem', color: '#FFFFFF',fontWeight: 400 },
        '.font-p36-FFFFFF-w600': { fontSize: '2.25rem', lineHeight: '2.625rem', color: '#FFFFFF',fontWeight: 600 },
        '.font-p40-FFFFFF-w700': { fontSize: '2.5rem', lineHeight: '2.9375rem', color: '#FFFFFF',fontWeight: 700 },
        '.font-p50-FFFFFF-w400': { fontSize: '3.125rem', lineHeight: '3.875rem', color: '#FFFFFF',fontWeight: 400 },

        '.font-p60-FFFFFF-w700': { fontSize: '3.75rem', lineHeight: '4.375rem', color: '#FFFFFF',fontWeight: 700 },
      
      }

      addComponents(texts)
    })
  ],
}
