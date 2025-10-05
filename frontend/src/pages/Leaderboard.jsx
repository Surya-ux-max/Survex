import { useState, useEffect } from 'react';
import { Trophy, TrendingUp, Users, Calendar, Download } from 'lucide-react';
import Navbar from '../components/Navbar';
import { leaderboard } from '../services/api';

const Leaderboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('global');
  const [timeFilter, setTimeFilter] = useState('all-time');
  const [globalLeaderboard, setGlobalLeaderboard] = useState([]);
  const [departmentLeaderboard, setDepartmentLeaderboard] = useState([]);
  const [weeklyLeaderboard, setWeeklyLeaderboard] = useState([]);
  const [departmentRankings, setDepartmentRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRank, setUserRank] = useState(null);

  const departments = [
    'Computer Science Engineering',
    'Electronics and Communication Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electrical and Electronics Engineering',
    'Information Technology',
    'Biotechnology',
    'Chemical Engineering'
  ];

  useEffect(() => {
    loadLeaderboardData();
  }, [activeTab, timeFilter]);

  const loadLeaderboardData = async () => {
    setLoading(true);
    try {
      const promises = [];

      if (activeTab === 'global') {
        promises.push(leaderboard.getGlobal(100));
        if (timeFilter === 'weekly') {
          promises.push(leaderboard.getWeekly(100));
        }
      } else if (activeTab === 'department') {
        promises.push(leaderboard.getDepartment(user.department, 50));
      } else if (activeTab === 'departments') {
        promises.push(leaderboard.getDepartments());
      }

      // Get user rank
      promises.push(leaderboard.getUserRank(user._id));

      const results = await Promise.all(promises);

      if (activeTab === 'global') {
        if (timeFilter === 'weekly') {
          setWeeklyLeaderboard(results[1].data.leaderboard);
        } else {
          setGlobalLeaderboard(results[0].data.leaderboard);
        }
      } else if (activeTab === 'department') {
        setDepartmentLeaderboard(results[0].data.leaderboard);
      } else if (activeTab === 'departments') {
        setDepartmentRankings(results[0].data.rankings);
      }

      setUserRank(results[results.length - 1].data.rank);
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  const getRankColor = (rank) => {
    if (rank === 1) return 'text-yellow-600 bg-yellow-50';
    if (rank === 2) return 'text-gray-600 bg-gray-50';
    if (rank === 3) return 'text-orange-600 bg-orange-50';
    return 'text-gray-500 bg-gray-50';
  };

  const LeaderboardTable = ({ data, showDepartment = false }) => (
    <div className="space-y-2">
      {data.map((item, index) => (
        <div
          key={item._id}
          className={`flex items-center p-4 rounded-lg transition-colors ${
            item._id === user._id 
              ? 'bg-primary bg-opacity-10 border-2 border-primary' 
              : 'bg-white hover:bg-gray-50'
          }`}
        >
          {/* Rank */}
          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${getRankColor(item.rank)}`}>
            {getRankIcon(item.rank)}
          </div>

          {/* Avatar & Info */}
          <div className="flex items-center space-x-3 flex-1 ml-4">
            <img
              src={item.avatar_url || `https://ui-avatars.com/api/?name=${item.name}&background=2E7D32&color=fff`}
              alt={item.name}
              className="w-12 h-12 rounded-full border-2 border-gray-200"
            />
            <div>
              <div className="font-semibold text-gray-900">
                {item.name}
                {item._id === user._id && (
                  <span className="ml-2 text-xs bg-primary text-white px-2 py-1 rounded-full">You</span>
                )}
              </div>
              {showDepartment && (
                <div className="text-sm text-gray-500">{item.department}</div>
              )}
              {item.badges && item.badges.length > 0 && (
                <div className="text-sm text-gray-600">
                  {item.badges[item.badges.length - 1]}
                </div>
              )}
            </div>
          </div>

          {/* Points */}
          <div className="text-right">
            <div className="text-xl font-bold text-primary">
              {activeTab === 'global' && timeFilter === 'weekly' 
                ? item.weekly_points 
                : item.eco_points || item.total_points
              }
            </div>
            <div className="text-sm text-gray-500">
              {timeFilter === 'weekly' ? 'weekly pts' : 'total pts'}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const DepartmentRankings = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {departmentRankings.map((dept, index) => (
        <div key={dept._id} className="card">
          <div className="flex items-center justify-between mb-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${getRankColor(index + 1)}`}>
              {getRankIcon(index + 1)}
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-primary">{dept.total_points}</div>
              <div className="text-xs text-gray-500">total points</div>
            </div>
          </div>
          
          <h3 className="font-semibold text-gray-900 mb-2">{dept._id}</h3>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-500">Students</div>
              <div className="font-semibold">{dept.student_count}</div>
            </div>
            <div>
              <div className="text-gray-500">Avg Points</div>
              <div className="font-semibold">{Math.round(dept.avg_points)}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar user={user} />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-2">
              <Trophy className="text-primary" />
              <span>Leaderboard</span>
            </h1>
            <p className="text-gray-600 mt-2">See how you rank among eco-champions</p>
          </div>
          
          {userRank && (
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">#{userRank}</div>
              <div className="text-sm text-gray-500">Your Rank</div>
            </div>
          )}
        </div>

        {/* User Stats Card */}
        <div className="card mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={user.avatar_url || `https://ui-avatars.com/api/?name=${user.name}&background=2E7D32&color=fff`}
                alt={user.name}
                className="w-16 h-16 rounded-full border-4 border-primary"
              />
              <div>
                <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                <p className="text-gray-600">{user.department}</p>
                <p className="text-sm text-primary font-medium">
                  {user.badges?.[user.badges.length - 1] || '🌱 Green Beginner'}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">{user.eco_points || 0}</div>
              <div className="text-sm text-gray-500">Eco Points</div>
              <div className="text-sm text-gray-500">Rank #{userRank}</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-200 p-1 rounded-lg">
          {[
            { key: 'global', label: 'Global', icon: TrendingUp },
            { key: 'department', label: 'My Department', icon: Users },
            { key: 'departments', label: 'Department Rankings', icon: Trophy }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md font-medium transition-colors ${
                  activeTab === tab.key
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon size={20} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Time Filter */}
        {activeTab === 'global' && (
          <div className="flex items-center space-x-4 mb-6">
            <Calendar size={20} className="text-gray-500" />
            <div className="flex space-x-2">
              {[
                { key: 'all-time', label: 'All Time' },
                { key: 'weekly', label: 'This Week' }
              ].map(filter => (
                <button
                  key={filter.key}
                  onClick={() => setTimeFilter(filter.key)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    timeFilter === filter.key
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="card">
          {activeTab === 'global' && (
            <LeaderboardTable 
              data={timeFilter === 'weekly' ? weeklyLeaderboard : globalLeaderboard}
              showDepartment={true}
            />
          )}
          
          {activeTab === 'department' && (
            <LeaderboardTable 
              data={departmentLeaderboard}
              showDepartment={false}
            />
          )}
          
          {activeTab === 'departments' && <DepartmentRankings />}
        </div>

        {/* Empty State */}
        {((activeTab === 'global' && globalLeaderboard.length === 0) ||
          (activeTab === 'department' && departmentLeaderboard.length === 0) ||
          (activeTab === 'departments' && departmentRankings.length === 0)) && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No rankings yet</h3>
            <p className="text-gray-500">Complete challenges to appear on the leaderboard!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
