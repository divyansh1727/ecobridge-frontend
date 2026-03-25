import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Activity, 
  TrendingUp, 
  Users, 
  Truck, 
  CheckCircle, 
  AlertCircle,
  RefreshCw,
  Battery,
  MapPin,
  Clock,
  Zap
} from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    generators: 0,
    recyclers: 0,
    activeRequests: 0,
    completed: 0,
    efficiency: 0,
    totalWasteDiverted: 0, // in tons
  });

  const [liveActivities, setLiveActivities] = useState([
    { id: 1, text: "Plastic waste request matched with Recycler R-21", time: "2 min ago", type: "match" },
    { id: 2, text: "New recycler verification pending approval", time: "5 min ago", type: "alert" },
    { id: 3, text: "E-waste pickup completed in Zone-B", time: "12 min ago", type: "success" },
    { id: 4, text: "Generator onboarded from Industrial Park-3", time: "25 min ago", type: "info" },
  ]);

  const [systemHealth, setSystemHealth] = useState([
    { label: "Matching Engine", status: "Optimal", value: 98, color: "bg-green-500" },
    { label: "Recycler Network", status: "Stable", value: 92, color: "bg-green-400" },
    { label: "Pickup Logistics", status: "Operational", value: 88, color: "bg-blue-500" },
    { label: "Data Sync", status: "Live", value: 100, color: "bg-emerald-500" },
  ]);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [timeFilter, setTimeFilter] = useState("today");

  const animateStats = useCallback(() => {
    const target = {
      generators: 142,
      recyclers: 58,
      activeRequests: 31,
      completed: 684,
      efficiency: 87,
      totalWasteDiverted: 1245, // tons
    };

    let i = 0;
    const interval = setInterval(() => {
      i++;
      setStats({
        generators: Math.min(target.generators, i * 6),
        recyclers: Math.min(target.recyclers, i * 3),
        activeRequests: Math.min(target.activeRequests, i * 2),
        completed: Math.min(target.completed, i * 15),
        efficiency: Math.min(target.efficiency, i * 4),
        totalWasteDiverted: Math.min(target.totalWasteDiverted, i * 50),
      });

      if (i > 25) clearInterval(interval);
    }, 60);

    return () => clearInterval(interval);
  }, []);

  const refreshData = () => {
    setIsRefreshing(true);
    animateStats();
    
    // Add a new activity
    const newActivity = {
      id: Date.now(),
      text: "System data refreshed manually",
      time: "Just now",
      type: "info"
    };
    
    setLiveActivities(prev => [newActivity, ...prev.slice(0, 3)]);
    
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  useEffect(() => {
    animateStats();
    
    // Simulate real-time updates
    const realTimeInterval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        activeRequests: Math.floor(25 + Math.random() * 10),
        efficiency: Math.min(95, prev.efficiency + (Math.random() > 0.5 ? 1 : -1))
      }));
      
      // Occasionally add new activity
      if (Math.random() > 0.7) {
        const activities = [
          "New waste pickup scheduled in Downtown",
          "Recycler capacity increased by 15%",
          "System optimization completed",
          "Monthly report generated"
        ];
        
        const newActivity = {
          id: Date.now(),
          text: activities[Math.floor(Math.random() * activities.length)],
          time: "Just now",
          type: Math.random() > 0.5 ? "info" : "success"
        };
        
        setLiveActivities(prev => [newActivity, ...prev.slice(0, 3)]);
      }
    }, 10000);
    
    return () => clearInterval(realTimeInterval);
  }, [animateStats]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-emerald-900 to-teal-900 p-6 md:p-8 text-white">
      {/* ================= HEADER ================= */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-800/50 rounded-xl">
              <Activity className="w-6 h-6 text-emerald-300" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-wide">
              EcoBridge Command Center
            </h1>
          </div>
          <p className="text-green-300/80 mt-2 text-sm md:text-base">
            Real-time waste coordination & system intelligence
            <span className="ml-3 px-2 py-1 bg-emerald-800/30 rounded-full text-xs">
              <span className="w-2 h-2 bg-green-400 rounded-full inline-block mr-2 animate-pulse"></span>
              LIVE
            </span>
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex gap-2 bg-emerald-900/30 rounded-xl p-1">
            {["today", "week", "month", "year"].map((filter) => (
              <button
                key={filter}
                onClick={() => setTimeFilter(filter)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                  timeFilter === filter 
                    ? "bg-emerald-700 text-white" 
                    : "text-green-200/70 hover:text-white"
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={refreshData}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-600 rounded-xl font-medium transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </motion.button>
        </div>
      </motion.div>

      {/* ================= METRICS GRID ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6 mb-8">
        <MetricCard 
          title="Waste Generators" 
          value={stats.generators}
          icon={<Users className="w-5 h-5" />}
          trend={{ value: "+12%", positive: true }}
          description="Active this month"
        />
        
        <MetricCard 
          title="Active Recyclers" 
          value={stats.recyclers}
          icon={<Truck className="w-5 h-5" />}
          trend={{ value: "+5%", positive: true }}
          description="Processing waste"
        />
        
        <MetricCard 
          title="Live Requests" 
          value={stats.activeRequests}
          icon={<AlertCircle className="w-5 h-5" />}
          trend={{ value: "-3%", positive: false }}
          description="Awaiting pickup"
        />
        
        <MetricCard 
          title="Completed Pickups" 
          value={stats.completed}
          icon={<CheckCircle className="w-5 h-5" />}
          trend={{ value: "+18%", positive: true }}
          description="Total this month"
        />
        
        <EfficiencyCard value={stats.efficiency} />
      </div>

      {/* ================= WASTE DIVERTED CARD ================= */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-8 bg-gradient-to-r from-teal-800/30 to-emerald-800/30 rounded-2xl p-6 border border-white/10 backdrop-blur-sm"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Battery className="w-6 h-6 text-emerald-300" />
              <h3 className="text-xl font-semibold">Waste Diverted from Landfill</h3>
            </div>
            <p className="text-green-200/70">Total waste successfully processed</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{stats.totalWasteDiverted.toLocaleString()} tons</div>
            <p className="text-emerald-300 text-sm">Equivalent to 5,280 trees saved</p>
          </div>
        </div>
        <div className="mt-4 h-2 bg-emerald-900/50 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "87%" }}
            transition={{ duration: 2, delay: 0.5 }}
            className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
          />
        </div>
      </motion.div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
        {/* ACTIVITY FEED */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="xl:col-span-2"
        >
          <GlassPanel 
            title={
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5" />
                  <span>Live System Activity</span>
                </div>
                <span className="text-xs text-green-300 bg-emerald-900/30 px-3 py-1 rounded-full">
                  Last 24 hours
                </span>
              </div>
            }
            header={
              <div className="flex gap-2 overflow-x-auto pb-2">
                {["All", "Matches", "Alerts", "Completions", "New Users"].map((filter) => (
                  <button
                    key={filter}
                    className="px-3 py-1 text-sm bg-emerald-900/20 hover:bg-emerald-800/40 rounded-lg transition-colors whitespace-nowrap"
                  >
                    {filter}
                  </button>
                ))}
              </div>
            }
          >
            <AnimatePresence>
              {liveActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ActivityItem {...activity} />
                </motion.div>
              ))}
            </AnimatePresence>
            
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex items-center justify-center text-green-300/70">
                <Clock className="w-4 h-4 mr-2" />
                <span className="text-sm">Updates every 10 seconds</span>
              </div>
            </div>
          </GlassPanel>
        </motion.div>

        {/* SYSTEM HEALTH & MAP PREVIEW */}
        <div className="space-y-6 md:space-y-8">
          <GlassPanel title="System Health Status">
            <div className="space-y-4">
              {systemHealth.map((item, index) => (
                <HealthIndicator key={index} {...item} />
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-emerald-900/20 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Overall Health</span>
                <span className="text-emerald-300 font-bold">94.5%</span>
              </div>
              <div className="h-2 bg-emerald-900/50 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full" style={{ width: "94.5%" }} />
              </div>
            </div>
          </GlassPanel>

          {/* MAP PREVIEW */}
          <GlassPanel 
            title={
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>Active Pickup Zones</span>
              </div>
            }
          >
            <div className="h-48 bg-emerald-900/20 rounded-xl mb-4 flex items-center justify-center">
              <div className="relative w-40 h-40">
                {/* Simulated map zones */}
                {[1, 2, 3, 4].map((zone) => (
                  <motion.div
                    key={zone}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2, delay: zone * 0.3 }}
                    className={`absolute w-10 h-10 rounded-full border-2 ${
                      zone === 1 ? "bg-green-500/20 border-green-400 -top-2 left-10" :
                      zone === 2 ? "bg-blue-500/20 border-blue-400 top-16 left-4" :
                      zone === 3 ? "bg-emerald-500/20 border-emerald-400 top-20 right-8" :
                      "bg-teal-500/20 border-teal-400 bottom-8 left-20"
                    }`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Zap className="w-4 h-4" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="text-center text-sm text-green-200/70">
              4 active zones • 12 pickups in progress
            </div>
          </GlassPanel>
        </div>
      </div>

      {/* ================= BOTTOM STATS ================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { label: "Avg. Response Time", value: "12 min", icon: "⏱️" },
          { label: "Carbon Saved", value: "42 tCO₂", icon: "🌱" },
          { label: "Active Sessions", value: "1,248", icon: "👥" },
          { label: "Satisfaction Rate", value: "96%", icon: "⭐" },
        ].map((stat, index) => (
          <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-200/70 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <span className="text-2xl">{stat.icon}</span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function MetricCard({ title, value, icon, trend, description }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -5 }}
      className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 shadow-xl border border-white/10 hover:border-emerald-500/30 transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 bg-emerald-900/40 rounded-lg">
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
          trend.positive ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
        }`}>
          <TrendingUp className={`w-3 h-3 ${!trend.positive && 'rotate-180'}`} />
          {trend.value}
        </div>
      </div>
      <h2 className="text-3xl font-bold mb-1">{value.toLocaleString()}</h2>
      <p className="text-green-200/90 text-sm font-medium mb-1">{title}</p>
      <p className="text-green-300/60 text-xs">{description}</p>
    </motion.div>
  );
}

function EfficiencyCard({ value }) {
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative bg-gradient-to-br from-green-600/20 to-emerald-600/30 rounded-2xl p-6 shadow-xl border border-emerald-500/20 overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -translate-y-16 translate-x-16" />
      <div className="relative">
        <p className="text-sm text-green-200/80 mb-4">System Efficiency</p>
        <div className="flex items-center justify-center mb-4">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="45"
                stroke="currentColor"
                strokeWidth="10"
                fill="none"
                className="text-emerald-900/50"
              />
              <motion.circle
                cx="64"
                cy="64"
                r="45"
                stroke="url(#gradient)"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-3xl font-bold">{value}%</span>
              <span className="text-xs text-green-300/70 mt-1">Peak Today</span>
            </div>
          </div>
        </div>
        <p className="text-xs text-center text-green-300/80">
          Waste successfully diverted from landfill
        </p>
      </div>
    </motion.div>
  );
}

function GlassPanel({ title, children, header }) {
  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/10">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      {header && <div className="mb-4">{header}</div>}
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function ActivityItem({ text, time, type }) {
  const typeColors = {
    match: "bg-blue-500/20 border-blue-500",
    alert: "bg-amber-500/20 border-amber-500",
    success: "bg-green-500/20 border-green-500",
    info: "bg-emerald-500/20 border-emerald-500",
  };

  const typeIcons = {
    match: "🤝",
    alert: "⚠️",
    success: "✅",
    info: "ℹ️",
  };

  return (
    <motion.div
      whileHover={{ x: 4, backgroundColor: "rgba(255,255,255,0.05)" }}
      className="flex items-start gap-3 p-3 rounded-xl transition-all"
    >
      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${typeColors[type]}`}>
        {typeIcons[type]}
      </div>
      <div className="flex-1">
        <p className="text-sm">{text}</p>
        <p className="text-xs text-green-300/60 mt-1 flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {time}
        </p>
      </div>
    </motion.div>
  );
}

function HealthIndicator({ label, status, value, color }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-green-200">{label}</span>
        <span className="font-semibold text-green-400">{status}</span>
      </div>
      <div className="w-full bg-emerald-900/30 rounded-full h-2 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </div>
      <div className="text-right text-xs text-green-300/70 mt-1">{value}%</div>
    </div>
  );
}