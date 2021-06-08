import { NavigationRejectionReason } from './navigation-rejection-reason.enum';
import { TranslationKey } from '@share-book/features/translation/translation-key.enum';

export abstract class INavigationRejectService {
    public abstract reject(reason: NavigationRejectionReason, message: TranslationKey): void;
}
