import React, { useState, useEffect, useImperativeHandle, forwardRef, useCallback } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import dayjs from 'dayjs';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import isBetween from 'dayjs/plugin/isBetween';
import '../styles/Dashboard.css';
import { filterTransactions } from '../hooks/filterTransactions';

dayjs.extend(isBetween);

const PieChartComponent = forwardRef(({ transactions = [] }, ref) => {
    const [categoryData, setCategoryData] = useState([]);
    const [subCategoryData, setSubCategoryData] = useState([]);
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [hoveredSubCategoryData, setHoveredSubCategoryData] = useState([]);
    const [timePeriod, setTimePeriod] = useState('all');
    const [customStartDate, setCustomStartDate] = useState(null);
    const [customEndDate, setCustomEndDate] = useState(null);
    const [totalExpenses, setTotalExpenses] = useState(0);

    const categoryColors = [
        { label: 'Housing', color: '#FFA000', icon: 'fa-solid fa-home' },
        { label: 'Food & Drink', color: '#D84315', icon: 'fa-solid fa-utensils' },
        { label: 'Household', color: '#512DA8', icon: 'fa-solid fa-couch' },
        { label: 'Transport', color: '#0288D1', icon: 'fa-solid fa-road' },
        { label: 'Entertainment & Shopping', color: '#C2185B', icon: 'fa-solid fa-shopping-bag' }, 
        { label: 'Miscellaneous', color: '#455A64', icon: 'fa-solid fa-box-open' }
      ];

    const subCategories = {
        'Housing': ['Building & Garden', 'Rent & Fee'],
        'Food & Drink': ['Groceries', 'Cafe & Snacks', 'Restaurant & Bar', 'Alcohol & Tobacco'],
        'Household': ['Pets', 'Media, Mobile, and IT', 'Healthcare & Wellness'],
        'Transport': ['Vehicles & Fuel', 'Bus & Train'],
        'Entertainment & Shopping': ['Toys & Games', 'Culture & Entertainment', 'Beauty & Personal Care', 'Home Electronics', 'Clothes & Fashion', 'Vacation', 'Sports & Leisure'],
        'Miscellaneous': ['Swish', 'Savings', 'Investment']
    };

    const subCategoriesIcons = {
        'Building & Garden': 'fa-solid fa-tree',
        'Rent & Fee': 'fa-solid fa-file-invoice',
        'Groceries': 'fa-solid fa-shopping-cart',
        'Cafe & Snacks': 'fa-solid fa-coffee',
        'Restaurant & Bar': 'fa-solid fa-pizza-slice',
        'Alcohol & Tobacco': 'fa-solid fa-wine-bottle',
        'Pets': 'fa-solid fa-dog',
        'Media, Mobile, and IT': 'fa-solid fa-mobile-alt',
        'Healthcare & Wellness': 'fa-solid fa-heartbeat',
        'Vehicles & Fuel': 'fa-solid fa-gas-pump',
        'Bus & Train': 'fa-solid fa-train',
        'Toys & Games': 'fa-solid fa-gamepad',
        'Culture & Entertainment': 'fa-solid fa-theater-masks',
        'Beauty & Personal Care': 'fa-solid fa-spa',
        'Home Electronics': 'fa-solid fa-tv',
        'Clothes & Fashion': 'fa-solid fa-tshirt',
        'Vacation': 'fa-solid fa-plane',
        'Sports & Leisure': 'fa-solid fa-futbol',
        'Swish': 'fa-solid fa-mobile-alt',
        'Savings': 'fa-solid fa-piggy-bank',
        'Investment': 'fa-solid fa-chart-line'
    };

    const fetchData = useCallback(() => {
        const filteredTransactions = filterTransactions(transactions, timePeriod, customStartDate, customEndDate);

        const categoryData = {};
        const subCategoryData = {};
        let total = 0;

        filteredTransactions.forEach(transaction => {
            if (transaction.transaction_type === 'Expense') {
                console.log('Transaction:', transaction);
                const category = transaction.category;
                const amount = parseFloat(transaction.amount);
                total += amount;

                if (!categoryData[category]) {
                    categoryData[category] = 0;
                }
                categoryData[category] -= parseFloat(transaction.amount);

                if (!subCategoryData[category]) {
                    subCategoryData[category] = {};
                }
                const subCategory = transaction.subCategory;
                if (!subCategoryData[category][subCategory]) {
                    subCategoryData[category][subCategory] = 0;
                }
                subCategoryData[category][subCategory] -= parseFloat(transaction.amount);
            }
        });

        const formattedCategoryData = Object.keys(categoryData).map((category) => {
            const colorInfo = categoryColors.find(c => c.label === category);
            return {
                name: category,
                value: categoryData[category],
                color: colorInfo ? colorInfo.color : '#000',
                icon: colorInfo ? colorInfo.icon : 'fa-solid fa-question',
            };
        });

        setCategoryData(formattedCategoryData);
        setSubCategoryData(subCategoryData);
        setTotalExpenses(Math.abs(total));
    }, [transactions, timePeriod, customStartDate, customEndDate]);

    const handleMouseEnter = (category) => {
        setHoveredCategory(category);

        const formattedSubcategoryData = Object.keys(subCategoryData[category] || {}).map((subCategory) => {
            const colorInfo = categoryColors.find(c => c.label === category) || { color: '#000', icon: 'fa-solid fa-question' };
            return {
                name: subCategory,
                value: subCategoryData[category][subCategory],
                color: colorInfo.color,
                icon: subCategoriesIcons[subCategory] || 'fa-solid fa-question'
            };
        });
        setHoveredSubCategoryData(formattedSubcategoryData);
    };

    const handleMouseLeave = () => {
        setHoveredCategory(null);
        setHoveredSubCategoryData([]);
    };

    useImperativeHandle(ref, () => ({
        fetchData
    }));

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleTimePeriodChange = (period) => {
        setTimePeriod(period);
    };

    const renderCustomizedLabel = useCallback(({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const RADIAN = Math.PI / 180;
        const radius = (innerRadius + outerRadius) / 2;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        const iconClass = categoryData[index]?.icon || 'fa-solid fa-question';

        return (
            <g>
                <foreignObject x={x - 10} y={y - 10} width={20} height={20} style={{ overflow: "visible", pointerEvents: 'none' }}>
                    <i className={iconClass} style={{ color: "white" }}></i>
                </foreignObject>
            </g>
        );
    }, [categoryData]);

    const renderSubcategoryLabel = useCallback(({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const RADIAN = Math.PI / 180;
        const radius = (innerRadius + outerRadius) / 2;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        const iconClass = hoveredSubCategoryData[index]?.icon || 'fa-solid fa-question';

        return (
            <g>
                <foreignObject x={x - 10} y={y - 10} width={20} height={20} style={{ overflow: "visible", pointerEvents: 'none' }}>
                    <i className={iconClass} style={{ color: "white" }}></i>
                </foreignObject>
            </g>
        );
    }, [hoveredSubCategoryData]);

    const Legend = ({ data }) => {
        return (
            <div className="legend">
                <div className="legend-header">
                    <span className="legend-title">Categories</span>
                    <span className="total-expenses">{totalExpenses.toFixed(0)}:-</span>
                </div>
                {data.map((entry, index) => {
                    return (
                        <div key={index} className="legend-item">
                            <span className={"legend-name"} style={{ color: entry.color }}>
                                {entry.name}
                            </span>
                            <span className="legend-text">{`${Math.round(entry.value)}:-`}</span>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div id="pie-chart-with-legend">
            <div id="pie-chart-with-legend-container">
                <div className="time-period-buttons-pie">
                    <button
                        className={timePeriod === 'weekly' ? 'active' : ''}
                        onClick={() => handleTimePeriodChange('weekly')}
                    >
                        1W
                    </button>
                    <button
                        className={timePeriod === 'monthly' ? 'active' : ''}
                        onClick={() => handleTimePeriodChange('monthly')}
                    >
                        1M
                    </button>
                    <button
                        className={timePeriod === 'yearly' ? 'active' : ''}
                        onClick={() => handleTimePeriodChange('yearly')}
                    >
                        1Y
                    </button>
                    <button
                        className={timePeriod === 'all' ? 'active' : ''}
                        onClick={() => handleTimePeriodChange('all')}
                    >
                        All
                    </button>
                    <button
                        className={timePeriod === 'custom' ? 'active' : ''}
                        onClick={() => handleTimePeriodChange('custom')}
                    >
                        Custom
                    </button>
                </div>
                {timePeriod === 'custom' && (
                    <div className="custom-date-range">
                        <DatePicker
                            selected={customStartDate}
                            onChange={(date) => setCustomStartDate(date)}
                            selectsStart
                            startDate={customStartDate}
                            endDate={customEndDate}
                            placeholderText="Start Date"
                        />
                        <DatePicker
                            selected={customEndDate}
                            onChange={(date) => setCustomEndDate(date)}
                            selectsEnd
                            startDate={customStartDate}
                            endDate={customEndDate}
                            placeholderText="End Date"
                        />
                    </div>
                )}
                <div className="pie-chart">
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={categoryData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={90}
                                innerRadius={60}
                                fill="#8884d8"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                paddingAngle={0}
                                isAnimationActive={false}
                                onMouseEnter={({ name }) => handleMouseEnter(name)}
                                onMouseLeave={handleMouseLeave}
                            >
                                {categoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            {hoveredCategory && hoveredSubCategoryData.length > 0 && (
                                <Pie
                                    data={hoveredSubCategoryData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={60}
                                    innerRadius={0}
                                    fill="#82ca9d"
                                    labelLine={false}
                                    label={renderSubcategoryLabel}
                                    paddingAngle={0}
                                    isAnimationActive={false}
                                >
                                    {hoveredSubCategoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                            )}
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <Legend data={hoveredCategory ? hoveredSubCategoryData : categoryData} />
            </div>
        </div>
    );
});

export default PieChartComponent;
