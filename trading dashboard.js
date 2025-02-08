import React, { useState, useEffect } from 'react';
import { Edit, Download, Target, Minus, Bell, User, ChevronDown, MessageSquare, Heart, RefreshCw, Sun, HelpCircle, Settings, Maximize } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const TradingInterface = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [showBalancePopup, setShowBalancePopup] = useState(false);
    const [stake, setStake] = useState(10);
    const [takeProfit, setTakeProfit] = useState(false);
    const [takeProfitAmount, setTakeProfitAmount] = useState('');

    // Sample chart data
    const chartData = [
        { time: "09:06:45", value: 936.2 },
        { time: "09:06:50", value: 936.8 },
        { time: "09:06:55", value: 936.6 },
        { time: "09:07:00", value: 936.3 },
        { time: "09:07:05", value: 937.0 },
        { time: "09:07:10", value: 936.5 },
        { time: "09:07:15", value: 936.4 }
    ];

    const handleStakeChange = (amount) => {
        const newStake = Math.max(0, stake + amount);
        setStake(newStake);
    };

    const containerClasses = `min-h-screen ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`;
    const cardClasses = `${isDarkTheme ? 'bg-gray-800' : 'bg-white'}`;

    return (
        <div className={containerClasses}>
            {/* Top Navigation */}
            <div className={`flex items-center justify-between p-4 ${cardClasses} border-b`}>
                <div className="flex items-center space-x-6">
                    <span className="text-red-500 text-2xl font-bold">d</span>
                    <span>Trader's Hub</span>
                    <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded">
                        <span>DT</span>
                        <span>derivTrader</span>
                        <ChevronDown size={16} />
                    </div>
                    <span>Reports</span>
                    <span>Cashier</span>
                </div>

                <div className="flex items-center space-x-4">
                    <Bell size={20} />
                    <User size={20} />
                    <div className="relative">
                        <button
                            className="flex items-center space-x-2"
                            onClick={() => setShowBalancePopup(!showBalancePopup)}
                        >
                            <span className="text-blue-500">10,000.00 USD</span>
                            <ChevronDown size={16} />
                        </button>

                        {showBalancePopup && (
                            <div className={`absolute right-0 mt-2 w-64 ${cardClasses} shadow-lg rounded-lg p-4`}>
                                <div className="font-bold mb-2">Deriv Account</div>
                                <div className="mb-2"><strong>Demo</strong> (VRTC12500828)</div>
                                <div className="mb-2"><strong>Total Assets:</strong> 10,000.00 USD</div>
                                <button className="text-blue-500">Go to Trader's Hub</button>
                            </div>
                        )}
                    </div>
                    <button className="bg-red-500 text-white px-4 py-1 rounded">Deposit</button>
                </div>
            </div>

            <div className="flex flex-1">
                {/* Left Sidebar */}
                <div className={`w-16 ${cardClasses} border-r`}>
                    <div className="flex flex-col space-y-4 p-2">
                        <button className="p-2 hover:bg-gray-100 rounded"><Edit size={20} /></button>
                        <button className="p-2 hover:bg-gray-100 rounded"><Download size={20} /></button>
                        <button className="p-2 hover:bg-gray-100 rounded"><Target size={20} /></button>
                        <button className="p-2 hover:bg-gray-100 rounded"><Minus size={20} /></button>
                    </div>
                </div>

                {/* Main Chart Area */}
                <div className="flex-1 p-4">
                    <div className={`${cardClasses} rounded-lg p-4`}>
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <span className="font-semibold">Volatility 100 (1s) Index</span>
                                <span className="text-gray-500 ml-2">936.40 -0.06 (0.01%)</span>
                            </div>
                            <button className="text-blue-500 text-sm">Learn about this trade type</button>
                        </div>

                        <div className="h-96">
                            <LineChart width={800} height={300} data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="time" />
                                <YAxis domain={['auto', 'auto']} />
                                <Tooltip />
                                <Line type="monotone" dataKey="value" stroke="#8884d8" dot={false} />
                            </LineChart>
                        </div>
                    </div>
                </div>

                {/* Right Controls */}
                <div className={`w-72 ${cardClasses} border-l p-4`}>
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-semibold mb-2">Multipliers</h3>
                            <button className="px-3 py-1 border rounded hover:bg-gray-100">×1</button>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-2">Stake</h3>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => handleStakeChange(-1)}
                                    className="px-3 py-1 border rounded hover:bg-gray-100"
                                >-</button>
                                <input
                                    type="number"
                                    value={stake}
                                    onChange={(e) => setStake(Math.max(0, Number(e.target.value)))}
                                    className="w-20 px-2 py-1 border rounded text-center"
                                />
                                <button
                                    onClick={() => handleStakeChange(1)}
                                    className="px-3 py-1 border rounded hover:bg-gray-100"
                                >+</button>
                                <span>USD</span>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-2">Take profit</h3>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={takeProfit}
                                    onChange={(e) => setTakeProfit(e.target.checked)}
                                />
                                <input
                                    type="number"
                                    value={takeProfitAmount}
                                    onChange={(e) => setTakeProfitAmount(e.target.value)}
                                    placeholder="Enter amount"
                                    disabled={!takeProfit}
                                    className="w-32 px-2 py-1 border rounded"
                                />
                                <span>USD</span>
                            </div>
                        </div>

                        <div className="flex space-x-2">
                            <button className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600">
                                Up
                            </button>
                            <button className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600">
                                Down
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Status Bar */}
            <div className={`flex items-center justify-between p-4 ${cardClasses} border-t`}>
                <span>2025-02-08 09:07:15 GMT</span>
                <div className="flex items-center space-x-4">
                    <MessageSquare size={16} />
                    <Heart size={16} />
                    <RefreshCw size={16} />
                    <Sun size={16} onClick={() => setIsDarkTheme(!isDarkTheme)} className="cursor-pointer" />
                    <HelpCircle size={16} />
                    <Settings size={16} />
                    <span className="font-semibold">EN</span>
                    <Maximize size={16} />
                </div>
            </div>
        </div>
    );
};

export default TradingInterface;