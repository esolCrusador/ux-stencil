import { Pipe, PipeTransform } from '@angular/core';

export enum ContactType {
    Instagram = 1,
    Phone,
    Viber,
    WhatsApp,
    Telegram,
    Mail
}

type AllContactResolvers = { [contactType in keyof typeof ContactType]: (contact: string) => string };
type ContactResvoler = { [contactType in ContactType]: (contact: string) => string };

@Pipe({
    name: 'contactLinkPipe',
})
export class ContactLinkPipe implements PipeTransform {
    private static readonly AllContactResolvers: AllContactResolvers = {
        Instagram: instagram => `https://www.instagram.com/${instagram.replace(/^@/, '')}/`,
        Phone: phoneNumber => `tel:${phoneNumber}`,
        Viber: viber => `viber://chat?number=${viber}`,
        WhatsApp: whatsapp => `https://wa.me/${whatsapp.replace(/[^\d]/, '')}`,
        Telegram: telegram => `https://t.me/${telegram.replace(/^@/, '')}`,
        Mail: email => `mailto://${email}`
    };
    private static readonly ContactResolver: ContactResvoler = Object.keys(ContactLinkPipe.AllContactResolvers)
        .reduce(
            (agg, contactType) => {
                agg[ContactType[contactType]] = ContactLinkPipe.AllContactResolvers[contactType];

                return agg;
            },
            {} as ContactResvoler
        );

    public transform(contact: string, contactType: ContactType) {
        return ContactLinkPipe.ContactResolver[contactType](contact);
    }
}
