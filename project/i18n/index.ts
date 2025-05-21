import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

import pt from './pt.json';
import en from './en.json';

i18n.fallbacks = true;
i18n.translations = { pt, en };
i18n.locale = Localization.locale || 'pt';

export default i18n;
