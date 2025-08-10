import { DashboardData } from '../types';

interface DashboardCardsProps {
    data: DashboardData;
}

export function DashboardCards({ data }: DashboardCardsProps) {
    const cards = [
        {
            title: 'Total Returns',
            value: data.totalReturns,
            trend: '+12%',
            trendType: 'negative' as const,
            subtitle: 'Across all variants'
        },
        {
            title: 'Affected Products',
            value: data.affectedProducts,
            trend: `${data.criticalProducts} critical`,
            trendType: data.criticalProducts > 10 ? 'negative' : data.criticalProducts > 5 ? 'neutral' : 'positive' as const,
            subtitle: 'Products with returns'
        },
        {
            title: 'Top Return Reason',
            value: data.topReturnReason,
            trend: `${data.topReturnReasonCount} cases`,
            trendType: 'neutral' as const,
            subtitle: 'Most common issue'
        },
        {
            title: 'Most Problematic',
            value: data.mostProblematicProduct,
            trend: `${data.mostProblematicProductCount} returns`,
            trendType: 'negative' as const,
            subtitle: 'Needs attention'
        },

    ];

    return (
        <div className="dashboard-cards">
            {cards.map((card, index) => (
                <div key={index} className="dashboard-card">
                    <div className="card-header">
                        <div className="card-title">{card.title}</div>
                    </div>
                    <div className="card-content">
                        <div className="card-value">{card.value}</div>
                        <div className="card-subtitle">{card.subtitle}</div>
                    </div>
                    <div className="card-footer">
                        <span className={`trend trend-${card.trendType}`}>
                            {card.trend}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}
