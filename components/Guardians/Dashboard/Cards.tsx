import { FC } from 'react';

interface CardData {
  title: string;
  amount: string;
  percentage: string;
  period: string;
  icon: string;
  iconGradient: string;
  percentageColor: string;
}

const cardData: CardData[] = [
  {
    title: "Today's Money",
    amount: "$53,000",
    percentage: "+55%",
    period: "since yesterday",
    icon: "ni-money-coins",
    iconGradient: "from-blue-500 to-violet-500",
    percentageColor: "text-emerald-500",
  },
  {
    title: "Today's Users",
    amount: "2,300",
    percentage: "+3%",
    period: "since last week",
    icon: "ni-world",
    iconGradient: "from-red-600 to-orange-600",
    percentageColor: "text-emerald-500",
  },
  {
    title: "New Clients",
    amount: "+3,462",
    percentage: "-2%",
    period: "since last quarter",
    icon: "ni-paper-diploma",
    iconGradient: "from-emerald-500 to-teal-400",
    percentageColor: "text-red-600",
  },
  {
    title: "Sales",
    amount: "$103,430",
    percentage: "+5%",
    period: "than last month",
    icon: "ni-cart",
    iconGradient: "from-orange-500 to-yellow-500",
    percentageColor: "text-emerald-500",
  },
];

const DashboardCards: FC = () => {
  return (
    <div className="flex flex-wrap -mx-3">
      {cardData.map((card, index) => (
        <div key={index} className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
          <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
            <div className="flex-auto p-4">
              <div className="flex flex-row -mx-3">
                <div className="flex-none w-2/3 max-w-full px-3">
                  <div>
                    <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase dark:text-white dark:opacity-60">
                      {card.title}
                    </p>
                    <h5 className="mb-2 font-bold dark:text-white">{card.amount}</h5>
                    <p className="mb-0 dark:text-white dark:opacity-60">
                      <span className={`text-sm font-bold leading-normal ${card.percentageColor}`}>{card.percentage}</span>
                      {` ${card.period}`}
                    </p>
                  </div>
                </div>
                <div className="px-3 text-right basis-1/3">
                  <div className={`inline-block w-12 h-12 text-center rounded-circle bg-gradient-to-tl ${card.iconGradient}`}>
                    <i className={`ni leading-none ${card.icon} text-lg relative top-3.5 text-white`}></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
