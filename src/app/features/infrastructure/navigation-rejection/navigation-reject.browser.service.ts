import { INavigationRejectService } from './i-navigation-reject.service';
import { ModalService } from '../../modal/services/modal.service';
import { AlertType } from '../../modal/confirmation-modal/alert-type.enum';
import { NavigationRejectionReason } from './navigation-rejection-reason.enum';
import { Injectable } from '@angular/core';
import { TranslationKey } from '@share-book/features/translation/translation-key.enum';
import { TranslationService } from '@share-book/features/translation/services/translation.service';

@Injectable()
export class NavigationRejectBrowserService implements INavigationRejectService {
    private reasonDictionary: { [reason in NavigationRejectionReason]: TranslationKey };

    constructor(
        private readonly modalService: ModalService,
        private readonly translationService: TranslationService,
    ) {
        const reasonDictionary: { [reason in keyof typeof NavigationRejectionReason]: TranslationKey } = {
            Gone: TranslationKey.Gone,
            NotFound: TranslationKey.NotFound,
            Unknown: TranslationKey.Unknown
        };
        const reasonKeys = Object.keys(reasonDictionary) as Array<keyof typeof NavigationRejectionReason>;

        this.reasonDictionary = reasonKeys.reduce(
            (agg, reason) => {
                agg[NavigationRejectionReason[reason]] = reasonDictionary[reason];

                return agg;
            },
            {} as { [reason in NavigationRejectionReason]: TranslationKey }
        );
    }

    public reject(reason: NavigationRejectionReason, message: TranslationKey): void {
        this.translationService.translateDictionary([this.reasonDictionary[reason], message])
        .subscribe(([reasonText, reasonMessage]) =>
            this.modalService.showAlertPopup(AlertType.Error, reasonText, reasonMessage)
        );
    }
}
