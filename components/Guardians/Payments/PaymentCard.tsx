import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

interface CardData {
  id: number;
  cardHolder?: string;
  expires?: string;
  imageSrc?: string;
  logoSrc?: string;
  cardNumber?: string;
  title?: string;
  subtitle?: string;
  amount: string;
  iconClass?: string;
}

const cards: CardData[] = [
  {
    id: 1,
    cardHolder: 'Jack Peterson',
    expires: '11/22',
    imageSrc: 'https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/card-visa.jpg',
    logoSrc: '../assets/img/logos/mastercard.png',
    cardNumber: '4562 1122 4594 7852',
    amount:"223455"
  },
  {
    id: 2,
    title: 'Salary',
    subtitle: 'Belong Interactive',
    amount: '+$2000',
    iconClass: 'fas fa-landmark',
  },
  {
    id: 3,
    title: 'Paypal',
    subtitle: 'Freelance Payment',
    amount: '$455.00',
    iconClass: 'fab fa-paypal',
  },
];

interface InvoiceData {
  id: number;
  date: string;
  reference: string;
  amount: string;
}

const invoiceData: InvoiceData[] = [
  { id: 1, date: 'March, 01, 2020', reference: '#MS-415646', amount: '$180' },
  { id: 2, date: 'February, 10, 2021', reference: '#RV-126749', amount: '$250' },
  { id: 3, date: 'April, 05, 2020', reference: '#FB-212562', amount: '$560' },
  { id: 4, date: 'June, 25, 2019', reference: '#QW-103578', amount: '$120' },
  { id: 5, date: 'March, 01, 2019', reference: '#AR-803481', amount: '$300' },
];

const PaymentCard: React.FC = () => (
  <div className="flex flex-wrap -mx-3">
    <div className="max-w-full px-3 lg:w-2/3 lg:flex-none">
      <div className="flex flex-wrap -mx-3">
        {cards.map((card) => (
          <div key={card.id} className="w-full max-w-full px-3 mb-6 xl:mb-0 xl:w-1/2 xl:flex-none">
            <div className="relative flex flex-col min-w-0 break-words bg-transparent border-0 border-transparent border-solid shadow-xl rounded-2xl bg-clip-border">
              <div
                className="relative overflow-hidden rounded-2xl"
                style={{ backgroundImage: `url(${card.imageSrc})` }}
              >
                <span className="absolute top-0 left-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-zinc-800 to-zinc-700 dark:bg-gradient-to-tl dark:from-slate-750 dark:to-gray-850 opacity-80"></span>
                <div className="relative z-10 flex-auto p-4">
                  <i className="p-2 text-white fas fa-wifi"></i>
                  <h5 className="pb-2 mt-6 mb-12 text-white">{card.cardNumber}</h5>
                  <div className="flex">
                    <div className="flex">
                      <div className="mr-6">
                        <p className="mb-0 text-sm leading-normal text-white opacity-80">Card Holder</p>
                        <h6 className="mb-0 text-white">{card.cardHolder}</h6>
                      </div>
                      <div>
                        <p className="mb-0 text-sm leading-normal text-white opacity-80">Expires</p>
                        <h6 className="mb-0 text-white">{card.expires}</h6>
                      </div>
                    </div>
                    <div className="flex items-end justify-end w-1/5 ml-auto">
                      <Image className="w-3/5 mt-2" src={card.logoSrc ?? ''} alt="logo" width={50} height={30} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {cards.slice(1).map((card) => (
          <div key={card.id} className="w-full max-w-full px-3 md:w-1/2 md:flex-none">
            <div className="relative flex flex-col min-w-0 break-words bg-white border-0 border-transparent border-solid shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
              <div className="p-4 mx-6 mb-0 text-center border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                <div className="w-16 h-16 text-center bg-center shadow-sm icon bg-gradient-to-tl from-blue-500 to-violet-500 rounded-xl">
                  <i className={`relative text-xl leading-none text-white opacity-100 ${card.iconClass} top-31/100`}></i>
                </div>
              </div>
              <div className="flex-auto p-4 pt-0 text-center">
                <h6 className="mb-0 text-center dark:text-white">{card.title}</h6>
                <span className="text-xs leading-tight dark:text-white dark:opacity-80">{card.subtitle}</span>
                <hr className="h-px my-4 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent" />
                <h5 className="mb-0 dark:text-white">{card.amount}</h5>
              </div>
            </div>
          </div>
        ))}
        <div className="max-w-full px-3 mb-6 lg:mb-0 lg:w-full lg:flex-none">
          <div className="relative flex flex-col min-w-0 mt-6 break-words bg-white border-0 border-transparent border-solid shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
            <div className="p-4 pb-0 mb-0 border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
              <div className="flex flex-wrap -mx-3">
                <div className="flex items-center flex-none w-1/2 max-w-full px-3">
                  <h6 className="mb-0 dark:text-white">Payment Method</h6>
                </div>
                <div className="flex-none w-1/2 max-w-full px-3 text-right">
                  <Link href="#">
                    <a className="inline-block px-5 py-2.5 font-bold leading-normal text-center text-white align-middle transition-all bg-transparent rounded-lg cursor-pointer text-sm ease-in shadow-md bg-150 bg-gradient-to-tl from-zinc-800 to-zinc-700 dark:bg-gradient-to-tl dark:from-slate-750 dark:to-gray-850 hover:shadow-xs active:opacity-85 hover:-translate-y-px tracking-tight-rem bg-x-25">
                      <i className="fas fa-plus"></i>&nbsp;&nbsp;Add New Card
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex-auto p-4">
              <div className="flex flex-wrap -mx-3">
                {invoiceData.map((invoice) => (
                  <div key={invoice.id} className="w-full max-w-full px-3 mb-6 md:mb-0 md:w-1/2 md:flex-none">
                    <div className="relative flex flex-row items-center flex-auto min-w-0 p-6 break-words bg-transparent border border-solid shadow-none md-max:overflow-auto rounded-xl border-slate-100 dark:border-slate-700 bg-clip-border">
                      <Image className="mb-0 mr-4 w-1/10" src="../assets/img/logos/mastercard.png" alt="logo" width={50} height={30} />
                      <h6 className="mb-0 dark:text-white">****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;7852</h6>
                      <i className="ml-auto cursor-pointer fas fa-pencil-alt text-slate-700" data-target="tooltip_trigger" data-placement="top"></i>
                      <div data-target="tooltip" className="hidden px-2 py-1 text-sm text-white bg-black rounded-lg">
                        Edit Card
                        <div className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']" data-popper-arrow></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="w-full max-w-full px-3 lg:w-1/3 lg:flex-none">
      <div className="relative flex flex-col h-full min-w-0 break-words bg-white border-0 border-transparent border-solid shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
        <div className="p-4 pb-0 mb-0 border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
          <h6 className="mb-0 dark:text-white">Recent Invoices</h6>
        </div>
        <div className="flex-auto p-4">
          <div className="flex flex-wrap -mx-3">
            {invoiceData.map((invoice) => (
              <div key={invoice.id} className="w-full max-w-full px-3 mb-6 md:mb-0 md:w-1/2 md:flex-none">
                <div className="relative flex flex-row items-center flex-auto min-w-0 p-6 break-words bg-transparent border border-solid shadow-none rounded-xl border-slate-100 dark:border-slate-700 bg-clip-border">
                  <div className="mr-4 flex-shrink-0">
                    <i className="text-xl leading-none text-slate-700 dark:text-white fas fa-file-invoice"></i>
                  </div>
                  <div className="ml-4">
                    <p className="mb-0 text-sm leading-normal text-slate-700 dark:text-white">{invoice.date}</p>
                    <h6 className="mb-0 dark:text-white">{invoice.reference}</h6>
                  </div>
                  <h6 className="ml-auto mb-0 text-sm leading-normal text-slate-700 dark:text-white">{invoice.amount}</h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PaymentCard;
