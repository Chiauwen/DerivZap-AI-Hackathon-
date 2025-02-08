import React, { useState, useEffect } from 'react';
import { Edit, Download, Target, Minus, Bell, User, ChevronDown, MessageSquare, Heart, RefreshCw, Sun, HelpCircle, Settings, Maximize } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useNavigate } from 'react-router-dom';
import logo from '../logo.svg';

const app_id = 68351; // Replace with your app_id
const socketUrl = `wss://ws.derivws.com/websockets/v3?app_id=${app_id}`;

const TradingInterface = () => {
    const navigate = useNavigate();
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [chartData, setChartData] = useState([]);
    const [showBalancePopup, setShowBalancePopup] = useState(false);
    const [stake, setStake] = useState(10);
    const [takeProfit, setTakeProfit] = useState(false);
    const [takeProfitAmount, setTakeProfitAmount] = useState('');
    const [showDropdown, setShowDropdown] = useState(false); // To control dropdown visibility
    const [selectedChartType, setSelectedChartType] = useState('Area'); // Selected chart type
    const [selectedTimeInterval, setSelectedTimeInterval] = useState('1 minute'); // Selected time interval

    // Sample chart data structure
    const chartTypes = ['Area', 'Candle', 'Hollow', 'OHLC'];
    const timeIntervals = {
        Area: ['1 tick', '1 minute', '2 minutes', '3 minutes', '5 minutes', '10 minutes', '15 minutes', '30 minutes', '1 hour', '2 hours', '4 hours', '8 hours', '1 day'],
        Candle: ['1 minute', '2 minutes', '3 minutes', '5 minutes', '10 minutes', '15 minutes', '30 minutes', '1 hour', '2 hours', '4 hours', '8 hours', '1 day'],
        Hollow: ['1 minute', '2 minutes', '3 minutes', '5 minutes', '10 minutes', '15 minutes', '30 minutes', '1 hour', '2 hours', '4 hours', '8 hours', '1 day'],
        OHLC: ['1 minute', '2 minutes', '3 minutes', '5 minutes', '10 minutes', '15 minutes', '30 minutes', '1 hour', '2 hours', '4 hours', '8 hours', '1 day'],
    };

    // WebSocket connection setup
    useEffect(() => {
        const socket = new WebSocket(socketUrl);

        socket.onopen = () => {
            console.log('[open] Connection established');
            socket.send(JSON.stringify({ ping: 1 })); // Send initial ping
        };

        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);

                // Assuming 'price' is part of the response and updating chart data
                if (data?.price) {
                    const newData = { time: new Date().toLocaleTimeString(), value: data.price };

                    setChartData((prevData) => {
                        const updatedData = [...prevData, newData];
                        if (updatedData.length > 100) updatedData.shift(); // Keep only the last 100 points
                        return updatedData;
                    });
                }
            } catch (error) {
                console.error('Error parsing WebSocket message:', error);
            }
        };

        socket.onerror = (error) => {
            console.log(`[error] ${error.message}`);
        };

        socket.onclose = (event) => {
            if (event.wasClean) {
                console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
            } else {
                console.log('[close] Connection died');
            }
        };

        // Cleanup the WebSocket connection when the component unmounts
        return () => {
            socket.close();
        };
    }, [chartData]);

    // Function to handle stake changes
    const handleStakeChange = (amount) => {
        const newStake = Math.max(0, stake + amount);
        setStake(newStake);
    };

    // Function to handle chart type changes
    const handleChartTypeChange = (chartType) => {
        setSelectedChartType(chartType);
        setSelectedTimeInterval(timeIntervals[chartType][0]); // Reset time interval to the first available option for the selected chart type
    };

    // Dynamic class for theme switching
    const containerClasses = `min-h-screen ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`;
    const cardClasses = `${isDarkTheme ? 'bg-gray-800' : 'bg-white'}`;

    return (
        <div className={containerClasses}>
            <div className={`flex items-center justify-between p-4 ${cardClasses} border-b`}>
                <div className="flex items-center space-x-6">
                    <span className="text-red-500 text-2xl font-bold">d</span>
                    <span>Trader's Hub</span>
                    <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded">
                        <img src={logo} alt="Logo" className="h-8 w-8" />
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
                <button 
                    onClick={() => navigate('/admin')}
                    className="bg-red-500 text-white px-4 py-1 rounded ml-2"
                >
                    Admin
                </button>
            </div>

            <div className="flex flex-1">
                {/* Left Sidebar */}
                <div className={`w-16 ${cardClasses} border-r`}>
                    <div className="flex flex-col space-y-4 p-2">
                        <button className="p-2 hover:bg-gray-100 rounded"><Edit size={20} /></button>
                        <button className="p-2 hover:bg-gray-100 rounded"><Download size={20} /></button>

                        {/* Dropdown for Chart Types */}
                        <div
                            className="relative"
                            onMouseEnter={() => setShowDropdown(true)}
                            onMouseLeave={() => setShowDropdown(false)}
                        >
                            <button className="p-2 hover:bg-gray-100 rounded"><Target size={20} /></button>

                            {showDropdown && (
                                <div className="absolute left-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 border">
                                    <div className="space-y-4">
                                        <div>
                                            <span className="font-semibold">Chart Types</span>
                                            <div className="space-y-2">
                                                {chartTypes.map((type) => (
                                                    <button
                                                        key={type}
                                                        onClick={() => handleChartTypeChange(type)}
                                                        className={`w-full text-left p-2 hover:bg-gray-100 rounded ${type === selectedChartType ? 'bg-gray-200' : ''}`}
                                                    >
                                                        {type}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <span className="font-semibold">Time Interval</span>
                                            <div className="space-y-2">
                                                {timeIntervals[selectedChartType].map((interval) => (
                                                    <button
                                                        key={interval}
                                                        onClick={() => setSelectedTimeInterval(interval)}
                                                        className={`w-full text-left p-2 hover:bg-gray-100 rounded ${interval === selectedTimeInterval ? 'bg-gray-200' : ''}`}
                                                    >
                                                        {interval}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

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