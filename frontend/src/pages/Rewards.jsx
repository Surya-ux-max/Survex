import { useState, useEffect } from 'react';
import { Gift, Plus, Star, History } from 'lucide-react';
import Navbar from '../components/Navbar';
import RewardCard from '../components/RewardCard';
import { rewards } from '../services/api';

const Rewards = ({ user }) => {
  const [activeTab, setActiveTab] = useState('available');
  const [rewardsList, setRewardsList] = useState([]);
  const [availableRewards, setAvailableRewards] = useState([]);
  const [claimedRewards, setClaimedRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newReward, setNewReward] = useState({
    title: '',
    description: '',
    category: 'certificate',
    points_required: 100,
    stock: null
  });

  const categories = [
    { key: 'certificate', label: 'Certificate', icon: '🏆' },
    { key: 'eco-merch', label: 'Eco Merchandise', icon: '👕' },
    { key: 'meal-token', label: 'Meal Token', icon: '🍽️' },
    { key: 'voucher', label: 'Voucher', icon: '🎫' },
    { key: 'badge', label: 'Digital Badge', icon: '🏅' }
  ];

  useEffect(() => {
    loadRewards();
  }, []);

  const loadRewards = async () => {
    try {
      const [allRewardsRes, availableRes, claimedRes] = await Promise.all([
        rewards.getAll(),
        rewards.getAvailable(),
        rewards.getMyClaims()
      ]);

      setRewardsList(allRewardsRes.data.rewards);
      setAvailableRewards(availableRes.data.rewards);
      setClaimedRewards(claimedRes.data.claims);
    } catch (error) {
      console.error('Error loading rewards:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateReward = async (e) => {
    e.preventDefault();
    try {
      await rewards.create({
        ...newReward,
        stock: newReward.stock === '' ? null : parseInt(newReward.stock)
      });
      setShowCreateModal(false);
      setNewReward({
        title: '',
        description: '',
        category: 'certificate',
        points_required: 100,
        stock: null
      });
      loadRewards();
    } catch (error) {
      console.error('Error creating reward:', error);
      alert('Failed to create reward');
    }
  };

  const handleClaimReward = (rewardId) => {
    // Remove from available rewards and refresh data
    setAvailableRewards(prev => prev.filter(reward => reward._id !== rewardId));
    loadRewards();
  };

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
              <Gift className="text-primary" />
              <span>Rewards Store</span>
            </h1>
            <p className="text-gray-600 mt-2">Redeem your eco-points for amazing rewards</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">{user.eco_points || 0}</div>
              <div className="text-sm text-gray-500">Available Points</div>
            </div>
            
            {user.role === 'admin' && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="btn-primary flex items-center space-x-2"
              >
                <Plus size={20} />
                <span>Add Reward</span>
              </button>
            )}
          </div>
        </div>

        {/* User Points Card */}
        <div className="card mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                <Star className="text-primary" size={32} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Your Eco Points</h2>
                <p className="text-gray-600">Earned through sustainable actions</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-4xl font-bold text-primary">{user.eco_points || 0}</div>
              <div className="text-sm text-gray-500">Points Available</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-200 p-1 rounded-lg">
          {[
            { key: 'available', label: 'Available Rewards', icon: Gift },
            { key: 'all', label: 'All Rewards', icon: Star },
            { key: 'claimed', label: 'My Claims', icon: History }
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

        {/* Content */}
        {activeTab === 'available' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableRewards.length > 0 ? (
              availableRewards.map(reward => (
                <RewardCard
                  key={reward._id}
                  reward={reward}
                  userPoints={user.eco_points || 0}
                  onClaim={handleClaimReward}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-6xl mb-4">🎁</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No rewards available</h3>
                <p className="text-gray-500">Earn more points to unlock rewards!</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'all' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rewardsList.map(reward => (
              <RewardCard
                key={reward._id}
                reward={reward}
                userPoints={user.eco_points || 0}
                onClaim={handleClaimReward}
              />
            ))}
          </div>
        )}

        {activeTab === 'claimed' && (
          <div className="space-y-4">
            {claimedRewards.length > 0 ? (
              claimedRewards.map((claim, index) => (
                <div key={index} className="card">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl">
                        {categories.find(cat => cat.key === claim.reward.category)?.icon || '🎁'}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{claim.reward.title}</h3>
                        <p className="text-gray-600">{claim.reward.description}</p>
                        <p className="text-sm text-gray-500">
                          Claimed on {new Date(claim.claimed_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary">
                        {claim.reward.points_required} pts
                      </div>
                      <div className="text-sm text-green-600 font-medium">✓ Claimed</div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No rewards claimed yet</h3>
                <p className="text-gray-500">Start claiming rewards to see them here!</p>
              </div>
            )}
          </div>
        )}

        {/* Create Reward Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Create New Reward</h2>
                
                <form onSubmit={handleCreateReward} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reward Title
                    </label>
                    <input
                      type="text"
                      required
                      value={newReward.title}
                      onChange={(e) => setNewReward({...newReward, title: e.target.value})}
                      className="input-field"
                      placeholder="Enter reward title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={newReward.category}
                      onChange={(e) => setNewReward({...newReward, category: e.target.value})}
                      className="input-field"
                    >
                      {categories.map(category => (
                        <option key={category.key} value={category.key}>
                          {category.icon} {category.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      required
                      value={newReward.description}
                      onChange={(e) => setNewReward({...newReward, description: e.target.value})}
                      className="input-field"
                      rows={3}
                      placeholder="Describe the reward"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Points Required
                    </label>
                    <input
                      type="number"
                      required
                      min="10"
                      value={newReward.points_required}
                      onChange={(e) => setNewReward({...newReward, points_required: parseInt(e.target.value)})}
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stock (leave empty for unlimited)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={newReward.stock || ''}
                      onChange={(e) => setNewReward({...newReward, stock: e.target.value})}
                      className="input-field"
                      placeholder="Enter stock quantity"
                    />
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowCreateModal(false)}
                      className="btn-secondary flex-1"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-primary flex-1"
                    >
                      Create Reward
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rewards;
