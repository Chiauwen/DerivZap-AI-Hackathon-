import React, { useState, useEffect, useRef } from 'react'
import {
    House,
    BookMarked,
    Bell,
    User,
    ChevronDown,
    MessageSquare,
    Heart,
    RefreshCw,
    Sun,
    HelpCircle,
    Settings,
    Maximize,
    Wallet,
    CircleAlert
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { useNavigate } from 'react-router-dom'
import logo from '../logo.svg'
import charts from '../assets/charts.svg'
import indicators from '../assets/indicators.svg'
import templates from '../assets/templates.svg'
import drawing from '../assets/drawing.svg'
import download from '../assets/download.svg'
import volatility100 from '../assets/volatility-100-1s.svg'
import multiplierup from '../assets/multipliers-up.svg';
import multiplierdown from '../assets/multipliers-down.svg';
import Swal from 'sweetalert2'

const TradingInterface = () => {
    const navigate = useNavigate();
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [showBalancePopup, setShowBalancePopup] = useState(false);
    const [stake, setStake] = useState(10);
    const [showDropdown, setShowDropdown] = useState(false); // To control dropdown visibility
    const [selectedChartType, setSelectedChartType] = useState('Area'); // Selected chart type
    const [selectedTimeInterval, setSelectedTimeInterval] = useState('1 minute');
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const userDropdownRef = useRef(null);

    // Sample chart data structure
    const chartTypes = ['Area', 'Candle', 'Hollow', 'OHLC']
    const timeIntervals = {
        Area: [
            '1 tick',
            '1 minute',
            '2 minutes',
            '3 minutes',
            '5 minutes',
            '10 minutes',
            '15 minutes',
            '30 minutes',
            '1 hour',
            '2 hours',
            '4 hours',
            '8 hours',
            '1 day',
        ],
        Candle: [
            '1 minute',
            '2 minutes',
            '3 minutes',
            '5 minutes',
            '10 minutes',
            '15 minutes',
            '30 minutes',
            '1 hour',
            '2 hours',
            '4 hours',
            '8 hours',
            '1 day',
        ],
        Hollow: [
            '1 minute',
            '2 minutes',
            '3 minutes',
            '5 minutes',
            '10 minutes',
            '15 minutes',
            '30 minutes',
            '1 hour',
            '2 hours',
            '4 hours',
            '8 hours',
            '1 day',
        ],
        OHLC: [
            '1 minute',
            '2 minutes',
            '3 minutes',
            '5 minutes',
            '10 minutes',
            '15 minutes',
            '30 minutes',
            '1 hour',
            '2 hours',
            '4 hours',
            '8 hours',
            '1 day',
        ],
    }

    // Sample chart data
    const chartData = [
        { time: '09:06:45', value: 936.2 },
        { time: '09:06:50', value: 936.8 },
        { time: '09:06:55', value: 936.6 },
        { time: '09:07:00', value: 936.3 },
        { time: '09:07:05', value: 937.0 },
        { time: '09:07:10', value: 936.5 },
        { time: '09:07:15', value: 936.4 },
    ]

    const growthRates = [1, 2, 3, 4, 5];

    // Function to handle stake changes
    const handleStakeChange = (amount) => {
        const newStake = Math.max(0, stake + amount)
        setStake(newStake)
    }

    // Function to handle chart type changes
    const handleChartTypeChange = (chartType) => {
        setSelectedChartType(chartType)
        setSelectedTimeInterval(timeIntervals[chartType][0]) // Reset time interval to the first available option for the selected chart type
    }

    // Dynamic class for theme switching
    const containerClasses = `min-h-screen ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
        }`
    const cardClasses = `${isDarkTheme ? 'bg-gray-800' : 'bg-white'}`
    const [clickedActions, setClickedActions] = React.useState([])

    const [connectionStatus, setConnectionStatus] = useState('Not connected')

  //   useEffect(() => {
  //     console.log('Component mounted') // Add this to verify the component loads
  //     testConnection()
  //   }, [])
  const sendToBackend = async (buttonId, buttonName) => {
    console.log('Sending button data to backend:', { buttonId, buttonName });
    
    try {
        const response = await fetch('http://127.0.0.1:5000/ui_analyse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                actions: [buttonId],  // ✅ Change "action" to "actions" (plural)
                buttonName: buttonName,
                timestamp: new Date().toISOString(),
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();  // ✅ Extract response data
        console.log('Response from Flask:', data);

        return data;  // ✅ Return the response data
    } catch (error) {
        console.error('Error:', error);
        return null;  // ✅ Return null in case of an error
    }
};



    return (
        <div className={containerClasses}>
            <div className="flex flex-col min-h-screen">
                {/* Content Area */}
                <div className="flex-grow">
                    {/* Your main content here */}
                    <div
                        className={`flex items-center justify-between p-4 ${cardClasses} border-b`}
                    >
                        <div className="flex items-center space-x-6">
                            <img src={logo} alt="Logo" className="h-8 w-8" />

                            {/* TRADER HUB */}
                            <button
                                className="flex items-center space-x-2 hover:bg-gray-100 px-3 transition-colors py-1 rounded"
                                onClick={() => {
                                    Swal.fire({
                                        title: 'Success!',
                                        text: 'You clicked the button',
                                        icon: 'success',
                                        confirmButtonText: 'OK',
                                    })
                                    sendToBackend('trader-hub')
                                }}
                            >
                                <House size={16} />
                                <span>Trader's Hub</span>
                            </button>

                            {/* REPORTS */}
                            <button
                                className="flex items-center space-x-2 hover:bg-gray-100 px-3 transition-colors py-1 rounded"
                                onClick={() => {
                                    Swal.fire({
                                        title: 'Success!',
                                        text: 'You clicked the button',
                                        icon: 'success',
                                        confirmButtonText: 'OK',
                                    })
                                    sendToBackend('reports')
                                }}
                            >
                                <BookMarked size={16} />
                                <span>Reports</span>
                            </button>
                        </div>

                        <div className="flex items-center space-x-4">
                            {/* NOTIFICATIONS   */}
                            <button
                                className="flex items-center space-x-2 hover:bg-gray-100 p-2 transition-colors rounded-full"
                                onClick={() => {
                                    Swal.fire({
                                        title: 'Success!',
                                        text: 'You clicked the button',
                                        icon: 'success',
                                        confirmButtonText: 'OK',
                                    })
                                    sendToBackend('notifications')
                                }}
                            >
                                <Bell size={20} />
                            </button>
                            <div className="relative" ref={userDropdownRef}>
                                <button
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                                >
                                    <User size={20} />
                                    {/* PORTFOLIO BUTTON */}
                                </button>

                {showUserDropdown && (
                  <div
                    className={`absolute right-0 mt-2 w-48 ${cardClasses} rounded-md shadow-lg py-1 z-50 border`}
                  >
                    <button
                      onClick={() => {
                        Swal.fire({
                          title: 'Success!',
                          text: 'Switch To Situation 1',
                          icon: 'success',
                          confirmButtonText: 'OK',
                        })
                        sendToBackend("3")
                        setShowUserDropdown(false)
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                    >
                      Situation 1
                    </button>
                    <button
                      onClick={() => {
                        Swal.fire({
                          title: 'Success!',
                          text: 'Switch To Situation 2',
                          icon: 'success',
                          confirmButtonText: 'OK',
                        })
                        sendToBackend("2")
                        setShowUserDropdown(false)
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                    >
                      Situation 2
                    </button>
                    <button
                      onClick={() => {
                        navigate('/admin')
                        setShowUserDropdown(false)
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                    >
                      Switch to Admin
                    </button>
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  className="flex items-center space-x-2"
                  onClick={() => setShowBalancePopup(!showBalancePopup)}
                >
                  <Wallet color="#4BB4B3" strokeWidth={2} size={16} />
                  <span className="font-bold text-[#4BB4B3]">
                    10,000.00 USD
                  </span>
                  <ChevronDown size={16} />
                </button>

                                {showBalancePopup && (
                                    <div
                                        className={`absolute right-0 mt-2 w-64 ${cardClasses} shadow-lg rounded-lg p-4`}
                                    >
                                        {/* DEPOSIT */}
                                        <button
                                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                                            onClick={() => {
                                                Swal.fire({
                                                    title: 'Success!',
                                                    text: 'You have deposit money into your DerivZap Acoount!',
                                                    icon: 'success',
                                                    confirmButtonText: 'OK',
                                                })
                                                sendToBackend('deposit')
                                            }}
                                        >
                                            Deposit
                                        </button>
                                        {/* WITHDRAWAL */}
                                        <button
                                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                                            onClick={() => {
                                                Swal.fire({
                                                    title: 'Success!',
                                                    text: 'You have withdrawn money to your bank account!',
                                                    icon: 'success',
                                                    confirmButtonText: 'OK',
                                                })
                                                sendToBackend('withdrawal')
                                            }}
                                        >
                                            Withdrawal
                                        </button>
                                        {/* TRANSFER */}
                                        <button
                                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                                            onClick={() => {
                                                Swal.fire({
                                                    title: 'Success!',
                                                    text: 'You have transfred money to another DerivZap Account!',
                                                    icon: 'success',
                                                    confirmButtonText: 'OK',
                                                })
                                                sendToBackend('transfer')
                                            }}
                                        >
                                            Transfer
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border-b px-4 py-2 flex items-center space-x-6">
                        <div className="relative">
                            {/* CHARTS */}
                            <button
                                className="flex items-center space-x-5 p-2 hover:bg-gray-100 transition-colors rounded"
                                onClick={() => {
                                    setShowDropdown((prev) => !prev)
                                    sendToBackend('charts')
                                }}
                            >
                                <img src={charts} alt="ChartsIcon" className="h-4 w-4" />
                                <span>Charts</span>
                                <ChevronDown className="h-4 w-4" />
                            </button>
                            {showDropdown && (
                                <div className="absolute left-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 border z-10">
                                    <div className="space-y-4">
                                        <div>
                                            <span className="font-semibold">Chart Types</span>
                                            <div className="space-y-2">
                                                {chartTypes.map((type) => (
                                                    <button
                                                        key={type}
                                                        onClick={() => handleChartTypeChange(type)}
                                                        className={`w-full text-left p-2 hover:bg-gray-100 rounded ${type === selectedChartType ? 'bg-gray-200' : ''
                                                            }`}
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
                                                        className={`w-full text-left p-2 hover:bg-gray-100 rounded ${interval === selectedTimeInterval
                                                                ? 'bg-gray-200'
                                                                : ''
                                                            }`}
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
                        {/* INDICATORS */}
                        <button
                            className="flex items-center space-x-5 hover:bg-gray-100 p-2 transition-colors rounded"
                            onClick={() => {
                                Swal.fire({
                                    title: 'Success!',
                                    text: 'You clicked the button',
                                    icon: 'success',
                                    confirmButtonText: 'OK',
                                })
                                sendToBackend('indicators')
                            }}
                        >
                            <img src={indicators} alt="IndicatorsIcon" className="h-5 w-5" />
                            <span>Indicators</span>
                            <ChevronDown className="h-4 w-4" />
                        </button>
                        {/* TEMPLATES */}
                        <button
                            className="flex items-center space-x-5 hover:bg-gray-100 p-2 transition-colors rounded"
                            onClick={() => {
                                Swal.fire({
                                    title: 'Success!',
                                    text: 'You clicked the button',
                                    icon: 'success',
                                    confirmButtonText: 'OK',
                                })
                                sendToBackend('templates')
                            }}
                        >
                            <img src={templates} alt="TemplatesIcon" className="h-5 w-5" />
                            <span>Templates</span>
                            <ChevronDown className="h-4 w-4" />
                        </button>
                        {/* TOOLS */}
                        <button
                            className="flex items-center space-x-5 hover:bg-gray-100 p-2 transition-colors rounded"
                            onClick={() => {
                                Swal.fire({
                                    title: 'Success!',
                                    text: 'You clicked the button',
                                    icon: 'success',
                                    confirmButtonText: 'OK',
                                })
                                sendToBackend('tools')
                            }}
                        >
                            <img src={drawing} alt="DrawingIcon" className="h-5 w-5" />
                            <span>Drawing Tools</span>
                            <ChevronDown className="h-4 w-4" />
                        </button>
                        {/* DOWNLOAD */}
                        <button
                            className="flex items-center space-x-5 hover:bg-gray-100 p-2 transition-colors rounded"
                            onClick={() => {
                                Swal.fire({
                                    title: 'Success!',
                                    text: 'You clicked the button',
                                    icon: 'success',
                                    confirmButtonText: 'OK',
                                })
                                sendToBackend('download')
                            }}
                        >
                            <img src={download} alt="DownloadIcon" className="h-5 w-5" />
                            <span>Download</span>
                        </button>
                    </div>

                    <div className="flex flex-1">
                        {/* Main Chart Area */}
                        <div className="flex-1 p-4">
                            <div className={`${cardClasses} rounded-lg p-4`}>
                                <div className="flex justify-between items-center mb-4">
                                    <button
                                        className="flex items-center space-x-5 bg-gray-100 p-3 transition-colors rounded"
                                        onClick={() => {
                                            Swal.fire({
                                                title: 'Success!',
                                                text: 'You have clicked the button!',
                                                icon: 'success',
                                                confirmButtonText: 'OK',
                                            })
                                        }}
                                    >
                                        <img
                                            src={volatility100}
                                            alt="Volatility100"
                                            className="h-8 w-8"
                                        />
                                        <span className="font-semibold">
                                            Volatility 100 (1s) Index
                                        </span>
                                        <span className="text-gray-500 ml-2 text-sm">
                                            936.40 -0.06 (0.01%)
                                        </span>
                                        <ChevronDown className="h-4 w-4" />
                                    </button>
                                </div>

                                <div className="h-96">
                                    <LineChart width={1100} height={400} data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="time" />
                                        <YAxis domain={['auto', 'auto']} />
                                        <Tooltip />
                                        <Line
                                            type="monotone"
                                            dataKey="value"
                                            stroke="#8884d8"
                                            dot={false}
                                        />
                                    </LineChart>
                                </div>
                            </div>
                        </div>

                        {/* Right Controls */}
                        <div className={`w-72 ${cardClasses} border-l p-4`}>
                            <div className="space-y-6">
                                <div className="flex justify-between items-center mb-4">
                                    <button className="flex items-center space-x-2 bg-gray-100 p-3 transition-colors rounded w-full"
                                        onClick={() => {
                                            Swal.fire({
                                                title: 'Success!',
                                                text: 'You have clicked the button!',
                                                icon: 'success',
                                                confirmButtonText: 'OK'
                                            });
                                        }}>
                                        <img src={multiplierup} alt="MultiplierUpIcon" className="h-5 w-5" />
                                        <img src={multiplierdown} alt="MultiplierDownIcon" className="h-5 w-5" />
                                        <h3 className="font-semibold flex-grow">Multipliers</h3>
                                        <ChevronDown className="h-4 w-4 ml-auto" />
                                    </button>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">Stake</h3>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => handleStakeChange(-1)}
                                            className="px-3 py-1 border rounded hover:bg-gray-100 hover:shadow-lg"
                                        >-</button>
                                        <input
                                            type="number"
                                            value={stake}
                                            onChange={(e) => setStake(Math.max(0, Number(e.target.value)))}
                                            className="w-20 px-2 py-1 border rounded text-center"
                                        />
                                        <button
                                            onClick={() => handleStakeChange(1)}
                                            className="px-3 py-1 border rounded hover:bg-gray-100 hover:shadow-lg"
                                        >+</button>
                                        <span>USD</span>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center space-x-2 bg-gray-100 p-3 transition-colors rounded w-full mb-2">
                                        <input
                                            type="checkbox"
                                        />
                                        <h3 className="font-semibold flex-1">Take profit</h3>
                                        <CircleAlert className="h-4 w-4 text-gray-500 ml-auto"/>
                                    </div>
                                    <div className="flex items-center space-x-2 bg-gray-100 p-3 transition-colors rounded w-full mb-2">
                                        <input
                                            type="checkbox"
                                        />
                                        <h3 className="font-semibold flex-1">Stop loss</h3>
                                        <CircleAlert className="h-4 w-4 text-gray-500 ml-auto"/>
                                    </div>
                                    <div className="flex items-center space-x-2 bg-gray-100 p-3 transition-colors rounded w-full">
                                        <input
                                            type="checkbox"
                                        />
                                        <h3 className="font-semibold flex-1">Deal cancellation</h3>
                                        <CircleAlert className="h-4 w-4 text-gray-500 ml-auto"/>
                                    </div>
                                </div>

                                <div className="flex space-x-2">
                                    {/* UP BUTTON */}
                                    <button
                                        className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600"
                                        onClick={() => {
                                            const currentTime = new Date().toLocaleString();
                                            console.log(`Trade In at: ${currentTime}`);
                                            Swal.fire({
                                                title: 'Success!',
                                                text: 'You have clicked Trade In',
                                                icon: 'success',
                                                confirmButtonText: 'OK',
                                            })
                                            sendToBackend('trade in')
                                        }}
                                    >
                                        Up
                                    </button>
                                    {/* DOWN BUTTON */}
                                    <button className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600"
                                        onClick={() => {
                                            const currentTime = new Date().toLocaleString();
                                            console.log(`Trade Out at: ${currentTime}`);
                                            Swal.fire({
                                                title: 'Success!',
                                                text: 'You have clicked Trade Out',
                                                icon: 'success',
                                                confirmButtonText: 'OK',
                                            })
                                            sendToBackend('trade out')
                                        }}>
                                        Down
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Status Bar */}
                <div
                    className={`flex items-center justify-between p-4 ${cardClasses} border-t mt-auto`}
                >
                    <span>2025-02-08 09:07:15 GMT</span>
                    <div className="flex items-center space-x-4">
                        <MessageSquare size={16} />
                        <Heart size={16} />
                        <RefreshCw size={16} />
                        <Sun
                            size={16}
                            onClick={() => setIsDarkTheme(!isDarkTheme)}
                            className="cursor-pointer"
                        />
                        <HelpCircle size={16} />
                        <Settings size={16} />
                        <span className="font-semibold">EN</span>
                        <Maximize size={16} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TradingInterface
