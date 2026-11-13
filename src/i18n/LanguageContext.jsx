import { createContext, useContext, useMemo, useState } from 'react'

const dictionary = {
  Home: 'Inicio',
  Casino: 'Casino',
  'Casino Live': 'Casino en Vivo',
  CASINO: 'CASINO',
  'CASINO LIVE': 'CASINO EN VIVO',
  'CRASH GAMES': 'CRASH GAMES',
  POKER: 'PÓKER',
  VIRTUAL: 'VIRTUAL',
  'Crash Games': 'Crash Games',
  Poker: 'Póker',
  Virtual: 'Virtual',
  Promotions: 'Promociones',
  Profile: 'Perfil',
  Messages: 'Mensajes',
  Add: 'Añadir',
  Logout: 'Cerrar sesión',
  Language: 'Idioma',
  Spanish: 'Español',
  English: 'Inglés',
  'Search games, tables...': 'Buscar juegos, mesas...',
  'Search provider...': 'Buscar proveedor...',
  'Search...': 'Buscar...',
  'Search games...': 'Buscar juegos...',
  'Search game...': 'Buscar juego...',
  'Search live table...': 'Buscar mesa en vivo...',
  'Search crash games...': 'Buscar crash games...',
  'Search games, live dealers, providers...': 'Buscar juegos, dealers en vivo, proveedores...',
  Categories: 'Categorías',
  Providers: 'Proveedores',
  Betting: 'Apuestas',
  Crash: 'Crash',
  Scratch: 'Scratch',
  'Top Winners of the Month': 'Ganadores del Mes',
  'Latest big wins distributed to lucky players': 'Últimas grandes victorias de jugadores afortunados',
  'View all': 'Ver todo',
  'Previous games': 'Juegos anteriores',
  'Next games': 'Juegos siguientes',
  Live: 'En vivo',
  LIVE: 'EN VIVO',
  Fresh: 'Nuevo',
  Slots: 'Tragamonedas',
  'Top performing titles': 'Títulos más populares',
  'New Games': 'Juegos nuevos',
  'All games': 'Todos los juegos',
  Favorites: 'Favoritos',
  Popular: 'Populares',
  New: 'Nuevos',
  'By Type': 'Por tipo',
  'By Provider': 'Por proveedor',
  Roulette: 'Ruleta',
  Blackjack: 'Blackjack',
  Baccarat: 'Baccarat',
  'Game Shows': 'Shows',
  'All providers': 'Todos los proveedores',
  'Play Now': 'Jugar ahora',
  'Load more games': 'Cargar más juegos',
  'Available Bonuses': 'Bonos disponibles',
  'Explore active promotions, deposit match perks, and rewarded spins':
    'Explora promociones activas, bonos de depósito y tiradas gratis',
  Bonuses: 'Bonos',
  'Available bonuses': 'Bonos disponibles',
  'Active bonuses': 'Bonos activos',
  'Bonus history': 'Historial de bonos',
  'Bonus Code': 'Código de bono',
  'Enter bonus code...': 'Ingresa el código de bono...',
  'Apply code': 'Aplicar código',
  'No bonuses available': 'No hay bonos disponibles',
  'No bonuses available at the moment.': 'No hay bonos disponibles por el momento.',
  'No active bonuses': 'No hay bonos activos',
  'Activate a bonus to see it listed here.': 'Activa un bono para verlo aquí.',
  'No bonus history': 'No hay historial de bonos',
  'Your claimed bonuses will appear here.': 'Tus bonos reclamados aparecerán aquí.',
  'Explore games': 'Explorar juegos',
  'Deposit Bonus': 'Bono de depósito',
  'Deposit $50 & Get $10': 'Deposita $50 y recibe $10',
  'Instant compensation on your first deposit': 'Compensación instantánea en tu primer depósito',
  'Claim Bonus': 'Reclamar bono',
  'Free Spins': 'Tiradas gratis',
  '20 Free Spins': '20 tiradas gratis',
  'Spin risk-free on selected titles with boosted multipliers.':
    'Gira sin riesgo en títulos seleccionados con multiplicadores aumentados.',
  'Get Spins': 'Obtener giros',
  'Welcome back.': 'Bienvenido de nuevo.',
  'Enter your credentials to access the high-stakes lobby.':
    'Ingresa tus credenciales para acceder al lobby.',
  'Email or username': 'Email o usuario',
  Password: 'Contraseña',
  'Forgot?': '¿Olvidaste?',
  'Enter the lobby': 'Entrar al lobby',
  'Join the club.': 'Únete al club.',
  'Create your account and unlock the full Velora experience.':
    'Crea tu cuenta y desbloquea la experiencia completa de Velora.',
  'Full name': 'Nombre completo',
  'Confirm password': 'Confirmar contraseña',
  'I confirm I am 18+ and accept the Terms of Service and Privacy Policy.':
    'Confirmo que soy mayor de 18 años y acepto los Términos del Servicio y la Política de Privacidad.',
  'Create account': 'Crear cuenta',
  'Already have an account?': '¿Ya tienes una cuenta?',
  'Log in': 'Iniciar sesión',
  Login: 'Iniciar sesión',
  Register: 'Registrarse',
  'My Games': 'Mis juegos',
  'My Favorites': 'Mis favoritos',
  'Popular Games': 'Juegos populares',
  '2026 VELORA | All rights reserved.': '2026 VELORA | Todos los derechos reservados.',
  'Notice: This is an advertisement for gambling services. Gambling should not be considered a solution to financial difficulties. Please read the terms and conditions carefully and gamble responsibly.':
    'Aviso: este es un anuncio de servicios de apuestas. El juego no debe considerarse una solución a dificultades financieras. Lee atentamente los términos y condiciones y juega con responsabilidad.',
  'Search Results': 'Resultados de búsqueda',
  'No results found': 'Sin resultados',
  'No messages': 'No hay mensajes',
  'No messages at the moment. Account notifications, exclusive bonuses and casino news will appear here.':
    'No tienes mensajes en este momento. Las notificaciones de cuenta, bonos exclusivos y novedades del casino aparecerán aquí.',
  'Try another name, category or provider.': 'Prueba con otro nombre, categoría o proveedor.',
  'Could not load games': 'No se pudieron cargar los juegos',
  'Check your connection and try again.': 'Revisa tu conexión e inténtalo de nuevo.',
  'Try again': 'Reintentar',
  'Loading...': 'Cargando...',
  'No recently played games yet': 'Aún no has jugado ningún juego',
  'Games you open will appear here.': 'Los juegos que abras aparecerán aquí.',
  'No slot games are available right now.': 'No hay tragamonedas disponibles por el momento.',
  'No crash games are available right now.': 'No hay crash games disponibles por el momento.',
  'No live tables are available right now.': 'No hay mesas en vivo disponibles por el momento.',
  'No new games are available right now.': 'No hay juegos nuevos disponibles por el momento.',
  'No virtual games are available right now.': 'No hay juegos virtuales disponibles por el momento.',
  'No poker games are available right now.': 'No hay juegos de póker disponibles por el momento.',
  'Table Games': 'Juegos de mesa',
  Lobby: 'Lobby',
  'available games': 'juegos disponibles',
  'available titles': 'títulos disponibles',
  'available live tables': 'mesas en vivo disponibles',
  Dashboard: 'Panel',
  Deposit: 'Depositar',
  Withdrawal: 'Retirar',
  Transactions: 'Transacciones',
  'Verify account': 'Verificar cuenta',
  'Responsible gambling': 'Juego responsable',
  'Personal information': 'Información personal',
  'Hi, user': 'Hola, user',
  'Available balance': 'Saldo disponible',
  Withdrawable: 'Retirable',
  Bonus: 'Bono',
  'Non withdrawable': 'No retirable',
  'No promotions yet': 'Aún no hay promociones',
  'Offers aimed at your account will show up here.': 'Las ofertas para tu cuenta aparecerán aquí.',
  'No sessions yet': 'Aún no hay sesiones',
  'Your recent game sessions will appear here.': 'Tus sesiones recientes aparecerán aquí.',
  'No favorites yet': 'Aún no hay favoritos',
  'Tap the heart on a game to keep it here.': 'Toca el corazón de un juego para guardarlo aquí.',
  Amount: 'Importe',
  'Payment method': 'Método de pago',
  'Deposit funds': 'Depositar fondos',
  'Secure payments': 'Pagos seguros',
  'Your transactions are protected with 256-bit SSL encryption.':
    'Tus transacciones están protegidas con cifrado SSL de 256 bits.',
  'Withdrawal method': 'Método de retiro',
  'Request withdrawal': 'Solicitar retiro',
  'Available to withdraw': 'Disponible para retirar',
  'Withdrawal requests are reviewed and processed according to the account verification status.':
    'Las solicitudes de retiro se revisan y procesan según el estado de verificación de la cuenta.',
  'No transactions yet': 'Aún no hay transacciones',
  'Your deposits, withdrawals and game activity will appear here.':
    'Tus depósitos, retiros y actividad de juego aparecerán aquí.',
  'Verify your identity': 'Verifica tu identidad',
  'Upload a valid ID and proof of address to unlock withdrawals and keep your account secure.':
    'Sube un documento de identidad válido y un comprobante de domicilio para desbloquear retiros y mantener tu cuenta segura.',
  'Upload documents': 'Subir documentos',
  'Deposit limit': 'Límite de depósito',
  'Set a daily, weekly or monthly limit for your deposits.':
    'Establece un límite diario, semanal o mensual para tus depósitos.',
  'Set limit': 'Establecer límite',
  'Session limit': 'Límite de sesión',
  'Receive a reminder after a chosen amount of play time.':
    'Recibe un recordatorio después de un tiempo de juego determinado.',
  'Self-exclusion': 'Autoexclusión',
  'Temporarily block access to your account and receive information about professional support services.':
    'Bloquea temporalmente el acceso a tu cuenta y recibe información sobre servicios de apoyo profesional.',
  'Request self-exclusion': 'Solicitar autoexclusión',
  Email: 'Email',
  Phone: 'Teléfono',
  'Date of birth': 'Fecha de nacimiento',
  'Save changes': 'Guardar cambios',
  Balance: 'Saldo',
  'Payment Method': 'Método de pago',
  'Your Details': 'Tus datos',
  'Payment confirmation will be sent to this email.': 'La confirmación del pago se enviará a este email.',
  'Optional. Country prefix + number.': 'Opcional. Prefijo de país + número.',
  Address: 'Dirección',
  'Street, avenue or number...': 'Calle, avenida o número...',
  City: 'Ciudad',
  'City...': 'Ciudad...',
  'Postal code': 'Código postal',
  Country: 'País',
  'Select country': 'Selecciona país',
  Other: 'Otro',
  Fee: 'Comisión',
  'Not applied by this method': 'No aplica con este método',
  Total: 'Total',
  'Processing time': 'Tiempo de procesamiento',
  Method: 'Método',
  'Confirmed by the operator': 'Confirmado por el operador',
  'Need help with your deposit? Contact support and we will get back to you.':
    '¿Necesitas ayuda con tu depósito? Contacta con soporte y te responderemos.',
  'Contact support': 'Contactar soporte',
  'Deposits are credited once the payment is confirmed. Amounts and limits are set by the operator.':
    'Los depósitos se acreditan cuando se confirma el pago. Los importes y límites los establece el operador.',
  'Last deposits': 'Últimos depósitos',
  'See all': 'Ver todo',
  'Withdrawable balance': 'Saldo retirable',
  'Withdrawal Method': 'Método de retiro',
  'First name': 'Nombre',
  'Last name': 'Apellidos',
  'Document type': 'Tipo de documento',
  Passport: 'Pasaporte',
  'Identity card': 'Documento de identidad',
  'Document number': 'Número de documento',
  Bank: 'Banco',
  'Type the bank name or code': 'Escribe el nombre o código del banco',
  'Choose your bank or type the code': 'Elige tu banco o escribe su código',
  'Account number': 'Número de cuenta',
  'CBU/CVU or IBAN': 'CBU/CVU o IBAN',
  'Enter the account number for your bank.': 'Ingresa el número de cuenta de tu banco.',
  'Type of account': 'Tipo de cuenta',
  Savings: 'Ahorros',
  Checking: 'Corriente',
  'You receive': 'Recibes',
  'Last withdrawals': 'Últimos retiros',
  'Withdrawals are reviewed before they are paid out. Contact support if you need help.':
    'Los retiros se revisan antes de pagarse. Contacta con soporte si necesitas ayuda.',
  'Account verification may be required before a withdrawal is approved. Limits are set by the operator.':
    'Puede ser necesaria la verificación de la cuenta antes de aprobar un retiro. Los límites los establece el operador.',
  'Transaction history': 'Historial de transacciones',
  All: 'Todos',
  Deposits: 'Depósitos',
  Withdrawals: 'Retiros',
  'Bets / Casino': 'Apuestas / Casino',
  Period: 'Período',
  'Last 30 days': 'Últimos 30 días',
  'Last 7 days': 'Últimos 7 días',
  'Last 90 days': 'Últimos 90 días',
  'All time': 'Todo el tiempo',
  Showing: 'Mostrando',
  transactions: 'transacciones',
  'Your deposits, withdrawals and bets will show up here once you start playing.':
    'Tus depósitos, retiros y apuestas aparecerán aquí cuando empieces a jugar.',
  'Make a deposit': 'Hacer un depósito',
  'Account verification (KYC)': 'Verificación de cuenta (KYC)',
  Unverified: 'No verificado',
  'To comply with regulations, we need to verify your identity. Please upload the following documents.':
    'Para cumplir con la normativa, necesitamos verificar tu identidad. Sube los siguientes documentos.',
  'Required documents': 'Documentos requeridos',
  'Identity document (ID / Passport)': 'Documento de identidad (DNI / Pasaporte)',
  'Proof of address (utility bill / bank statement)': 'Comprobante de domicilio (factura / extracto bancario)',
  'Selfie with ID': 'Selfie con documento',
  'Front and back, all four corners visible.': 'Frente y reverso, con las cuatro esquinas visibles.',
  'Issued within the last 3 months.': 'Emitido en los últimos 3 meses.',
  'Your face and the document in the same photo.': 'Tu rostro y el documento en la misma foto.',
  'Not uploaded': 'No subido',
  'Upload a document': 'Subir un documento',
  File: 'Archivo',
  'Choose file': 'Seleccionar archivo',
  'No file selected': 'Ningún archivo seleccionado',
  'JPG, PNG or PDF, up to 5 MB.': 'JPG, PNG o PDF, hasta 5 MB.',
  'Upload document': 'Subir documento',
  'Documents are reviewed manually and may take up to 72 hours.':
    'Los documentos se revisan manualmente y pueden tardar hasta 72 horas.',
  'Responsible Gambling Limits': 'Límites de juego responsable',
  'Set limits to control your spending and playing time. Decreasing a limit takes effect immediately; increases require a 24-hour waiting period.':
    'Establece límites para controlar tu gasto y tiempo de juego. Bajar un límite se aplica de inmediato; subirlo requiere una espera de 24 horas.',
  'Your active limits': 'Tus límites activos',
  'You have no limits set yet.': 'Aún no tienes límites establecidos.',
  'Add a new limit': 'Agregar un nuevo límite',
  'Limit type': 'Tipo de límite',
  'Daily deposit limit': 'Límite de depósito diario',
  'Weekly deposit limit': 'Límite de depósito semanal',
  'Monthly deposit limit': 'Límite de depósito mensual',
  'Session time limit': 'Límite de tiempo de sesión',
  'Loss limit': 'Límite de pérdidas',
  'e.g. 50 €': 'ej. 50 €',
  'Lowering a limit applies right away. Raising it only applies after 24 hours.':
    'Bajar un límite se aplica de inmediato. Subirlo solo se aplica después de 24 horas.',
  'Save limit': 'Guardar límite',
  'Keep your account details up to date.': 'Mantén actualizados los datos de tu cuenta.',
  'User profile': 'Perfil de usuario',
  Username: 'Nombre de usuario',
  'Current password': 'Contraseña actual',
  'Only needed if you are changing your password.': 'Solo es necesario si vas a cambiar tu contraseña.',
  'New password': 'Nueva contraseña',
  'Confirm new password': 'Confirmar nueva contraseña',
  'Personal data': 'Datos personales',
  'Birth date': 'Fecha de nacimiento',
  Save: 'Guardar',
  'View game': 'Ver juego',
  'More from': 'Más de',
  'Game preview': 'Vista previa del juego',
  'Launch game': 'Jugar ahora',
  'Game not found': 'Juego no encontrado',
  'Back to casino': 'Volver al casino',
  Back: 'Volver',
  Favorite: 'Favorito',
  Help: 'Ayuda',
  Share: 'Compartir',
  Fullscreen: 'Pantalla completa',
  'Exit fullscreen': 'Salir de pantalla completa',
  'View all winners': 'Ver todos los ganadores',
}

const LanguageContext = createContext(null)

function translate(value, language) {
  if (!value || language !== 'es') return value

  if (dictionary[value]) return dictionary[value]

  if (value.startsWith('Showing ')) {
    return value
      .replace('Showing', 'Mostrando')
      .replace(' of ', ' de ')
      .replace('available games', 'juegos disponibles')
      .replace('available titles', 'títulos disponibles')
      .replace('available live tables', 'mesas en vivo disponibles')
  }

  return value
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    if (typeof window === 'undefined') return 'es'
    return window.localStorage.getItem('velora-language') || 'es'
  })

  const setLanguage = (nextLanguage) => {
    setLanguageState(nextLanguage)
    window.localStorage.setItem('velora-language', nextLanguage)
  }

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: (text) => translate(text, language),
    }),
    [language],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }

  return context
}
