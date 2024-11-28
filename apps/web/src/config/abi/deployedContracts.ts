const deployedContracts = {
  8453: {
    RYFT: {
      address: '0x7aBe92aA0b6da4AeEf832F5Ce540dc49EAAd2dCA',
      abi: [
        {
          inputs: [
            { name: 'account', type: 'address' },
            { name: 'id', type: 'uint256' },
          ],
          name: 'balanceOf',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [{ name: 'tokenId_', type: 'uint256' }],
          name: 'totalSupply',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            { name: 'operator', type: 'address' },
            { name: 'approved', type: 'bool' },
          ],
          name: 'setApprovalForAll',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            { name: 'tokenId_', type: 'uint256' },
            { name: 'quantity_', type: 'uint256' },
            { name: 'recipient_', type: 'address' },
          ],
          name: 'wrapByProxy',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ],
    },
    DecentralBros: {
      address: '0x6a4e0F83D7882BcACFF89aaF6f60D24E13191E9F',
      abi: [
        {
          type: 'function',
          name: 'approve',
          stateMutability: 'nonpayable',
          inputs: [
            { name: 'spender', type: 'address' },
            { name: 'amount', type: 'uint256' },
          ],
          outputs: [{ type: 'bool' }],
        },
        {
          type: 'function',
          name: 'transferFrom',
          stateMutability: 'nonpayable',
          inputs: [
            { name: 'sender', type: 'address' },
            { name: 'recipient', type: 'address' },
            { name: 'amount', type: 'uint256' },
          ],
          outputs: [{ type: 'bool' }],
        },
      ],
    },
    DBROWrappedStaking: {
      address: '0x7e6Ee299aebe5808D1B0602Cea274Ee5f01a3DeE',
      abi: [
        {
          inputs: [
            {
              internalType: 'address',
              name: '_dbroToken',
              type: 'address',
            },
            {
              internalType: 'address',
              name: '_ryftContract',
              type: 'address',
            },
            {
              internalType: 'address',
              name: '_rewardsWallet',
              type: 'address',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'constructor',
        },
        {
          inputs: [],
          name: 'InsufficientAmount',
          type: 'error',
        },
        {
          inputs: [],
          name: 'MaxStakeExceeded',
          type: 'error',
        },
        {
          inputs: [],
          name: 'NoRewardsToClaim',
          type: 'error',
        },
        {
          inputs: [],
          name: 'NoTokensStaked',
          type: 'error',
        },
        {
          inputs: [],
          name: 'TransferFailed',
          type: 'error',
        },
        {
          inputs: [],
          name: 'Unauthorized',
          type: 'error',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'user',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'rewardAmount',
              type: 'uint256',
            },
          ],
          name: 'ClaimedRewards',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'uint256',
              name: 'oldMaxClaimableQuantity',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'newMaxClaimableQuantity',
              type: 'uint256',
            },
          ],
          name: 'MaxClaimableQuantityUpdated',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'previousOwner',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'newOwner',
              type: 'address',
            },
          ],
          name: 'OwnershipTransferred',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'uint256',
              name: 'oldRequiredDBRO',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'newRequiredDBRO',
              type: 'uint256',
            },
          ],
          name: 'RequiredDBROUpdated',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'address',
              name: 'oldRewardsWallet',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'address',
              name: 'newRewardsWallet',
              type: 'address',
            },
          ],
          name: 'RewardsWalletUpdated',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'address',
              name: 'oldRyftContract',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'address',
              name: 'newRyftContract',
              type: 'address',
            },
          ],
          name: 'RyftContractUpdated',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'user',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'amount',
              type: 'uint256',
            },
          ],
          name: 'Staked',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'user',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'amount',
              type: 'uint256',
            },
          ],
          name: 'Unstaked',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'amount',
              type: 'uint256',
            },
          ],
          name: 'Withdrawn',
          type: 'event',
        },
        {
          inputs: [],
          name: 'MAX_STAKE',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'REQUIRED_DBRO',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'RYFT_TOKEN_ID',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'SECONDS_IN_YEAR',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'UNSTAKE_FEE_PERCENT',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'UNWRAP_FEE_PERCENT',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'user',
              type: 'address',
            },
          ],
          name: 'calculatePendingRewards',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'claimReward',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'dbroToken',
          outputs: [
            {
              internalType: 'contract IERC20',
              name: '',
              type: 'address',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'getAnnualRewardRate',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'pure',
          type: 'function',
        },
        {
          inputs: [],
          name: 'getRewardsWalletBalance',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'user',
              type: 'address',
            },
          ],
          name: 'getStakeInfoAndPendingRewards',
          outputs: [
            {
              components: [
                {
                  internalType: 'uint256',
                  name: 'amountStaked',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'startTime',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'rewardDebt',
                  type: 'uint256',
                },
              ],
              internalType: 'struct DBROWrappedStaking.StakeInfo',
              name: '',
              type: 'tuple',
            },
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'maxClaimableQuantity',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
            {
              internalType: 'uint256[]',
              name: '',
              type: 'uint256[]',
            },
            {
              internalType: 'uint256[]',
              name: '',
              type: 'uint256[]',
            },
            {
              internalType: 'bytes',
              name: '',
              type: 'bytes',
            },
          ],
          name: 'onERC1155BatchReceived',
          outputs: [
            {
              internalType: 'bytes4',
              name: '',
              type: 'bytes4',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
            {
              internalType: 'bytes',
              name: '',
              type: 'bytes',
            },
          ],
          name: 'onERC1155Received',
          outputs: [
            {
              internalType: 'bytes4',
              name: '',
              type: 'bytes4',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'owner',
          outputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'renounceOwnership',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'rewardsWallet',
          outputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'ryftContract',
          outputs: [
            {
              internalType: 'contract IDRYFT',
              name: '',
              type: 'address',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: 'amount',
              type: 'uint256',
            },
          ],
          name: 'stake',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
          ],
          name: 'stakes',
          outputs: [
            {
              internalType: 'uint256',
              name: 'amountStaked',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'startTime',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'rewardDebt',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'bytes4',
              name: 'interfaceId_',
              type: 'bytes4',
            },
          ],
          name: 'supportsInterface',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'totalRewardTokens',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'tokenContractAddress',
              type: 'address',
            },
            {
              internalType: 'address',
              name: 'dRYFTContractAddress',
              type: 'address',
            },
          ],
          name: 'totalWrappedTokens',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'newOwner',
              type: 'address',
            },
          ],
          name: 'transferOwnership',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'unstake',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: 'quantity',
              type: 'uint256',
            },
          ],
          name: 'unwrapNFT',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: 'newMaxQuantity',
              type: 'uint256',
            },
          ],
          name: 'updateMaxClaimableQuantity',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: 'newRequiredDBRO',
              type: 'uint256',
            },
          ],
          name: 'updateRequiredDBRO',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'newRewardsWallet',
              type: 'address',
            },
          ],
          name: 'updateRewardsWallet',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'newRyftContract',
              type: 'address',
            },
          ],
          name: 'updateRyftContract',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'withdrawTokens',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: 'amount',
              type: 'uint256',
            },
          ],
          name: 'wrapTokens',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ],
    },
  },
  84532: {
    RYFT: {
      address: '0x0C9F57B01BE2690d469B01E44ff404F45b81Af2e',
      abi: [
        {
          inputs: [
            { name: 'account', type: 'address' },
            { name: 'id', type: 'uint256' },
          ],
          name: 'balanceOf',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [{ name: 'tokenId_', type: 'uint256' }],
          name: 'totalSupply',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            { name: 'operator', type: 'address' },
            { name: 'approved', type: 'bool' },
          ],
          name: 'setApprovalForAll',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            { name: 'tokenId_', type: 'uint256' },
            { name: 'quantity_', type: 'uint256' },
            { name: 'recipient_', type: 'address' },
          ],
          name: 'wrapByProxy',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ],
    },
    DecentralBros: {
      address: '0x5B7a6C42ee3ddf82582BA759Bb59A990D0e97398',
      abi: [
        {
          type: 'function',
          name: 'approve',
          stateMutability: 'nonpayable',
          inputs: [
            { name: 'spender', type: 'address' },
            { name: 'amount', type: 'uint256' },
          ],
          outputs: [{ type: 'bool' }],
        },
        {
          type: 'function',
          name: 'transferFrom',
          stateMutability: 'nonpayable',
          inputs: [
            { name: 'sender', type: 'address' },
            { name: 'recipient', type: 'address' },
            { name: 'amount', type: 'uint256' },
          ],
          outputs: [{ type: 'bool' }],
        },
      ],
    },

    DBROLottery: {
      address: '0xb0D5CE7E748BF88C2b84911Fc82d3A3a3d876C9d',
      abi: [
        {
          inputs: [
            {
              internalType: 'address',
              name: '_dbroTokenAddress',
              type: 'address',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'constructor',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'uint256',
              name: 'lotteryId',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'endTime',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'ticketPrice',
              type: 'uint256',
            },
          ],
          name: 'LotteryStarted',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'previousOwner',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'newOwner',
              type: 'address',
            },
          ],
          name: 'OwnershipTransferred',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'winner',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'tier',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'amount',
              type: 'uint256',
            },
          ],
          name: 'PrizeClaimed',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'address',
              name: 'buyer',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'lotteryId',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'ticketCount',
              type: 'uint256',
            },
          ],
          name: 'TicketsPurchased',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'uint256',
              name: 'lotteryId',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'winningNumber',
              type: 'uint256',
            },
          ],
          name: 'WinningNumberDrawn',
          type: 'event',
        },
        {
          inputs: [],
          name: 'FEE_PERCENTAGE',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '_ticketCount',
              type: 'uint256',
            },
          ],
          name: 'buyTickets',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'claimPrize',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'currentLotteryId',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'dbroToken',
          outputs: [
            {
              internalType: 'contract IERC20',
              name: '',
              type: 'address',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'drawWinningNumber',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'endLottery',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'endTime',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'maxTicketsPerWallet',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'owner',
          outputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          name: 'participantsByLottery',
          outputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'prizePool',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'renounceOwnership',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '_duration',
              type: 'uint256',
            },
          ],
          name: 'startLottery',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'status',
          outputs: [
            {
              internalType: 'enum DBROLottery.LotteryStatus',
              name: '',
              type: 'uint8',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'ticketPrice',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          name: 'ticketToUser',
          outputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          name: 'ticketsByUser',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          name: 'tierRewards',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          name: 'totalTickets',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'newOwner',
              type: 'address',
            },
          ],
          name: 'transferOwnership',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'winningNumber',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
      ],
    },
    DBROWrappedStaking: {
      address: '0x9A8a96bcA70adA5A74913767a4839c5E055Bf6CE',
      abi: [
        {
          inputs: [
            {
              internalType: 'address',
              name: '_dbroToken',
              type: 'address',
            },
            {
              internalType: 'address',
              name: '_ryftContract',
              type: 'address',
            },
            {
              internalType: 'address',
              name: '_rewardsWallet',
              type: 'address',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'constructor',
        },
        {
          inputs: [],
          name: 'InsufficientAmount',
          type: 'error',
        },
        {
          inputs: [],
          name: 'MaxStakeExceeded',
          type: 'error',
        },
        {
          inputs: [],
          name: 'NoRewardsToClaim',
          type: 'error',
        },
        {
          inputs: [],
          name: 'NoTokensStaked',
          type: 'error',
        },
        {
          inputs: [],
          name: 'TransferFailed',
          type: 'error',
        },
        {
          inputs: [],
          name: 'Unauthorized',
          type: 'error',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'user',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'rewardAmount',
              type: 'uint256',
            },
          ],
          name: 'ClaimedRewards',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'uint256',
              name: 'oldMaxClaimableQuantity',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'newMaxClaimableQuantity',
              type: 'uint256',
            },
          ],
          name: 'MaxClaimableQuantityUpdated',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'previousOwner',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'newOwner',
              type: 'address',
            },
          ],
          name: 'OwnershipTransferred',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'uint256',
              name: 'oldRequiredDBRO',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'newRequiredDBRO',
              type: 'uint256',
            },
          ],
          name: 'RequiredDBROUpdated',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'address',
              name: 'oldRewardsWallet',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'address',
              name: 'newRewardsWallet',
              type: 'address',
            },
          ],
          name: 'RewardsWalletUpdated',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'address',
              name: 'oldRyftContract',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'address',
              name: 'newRyftContract',
              type: 'address',
            },
          ],
          name: 'RyftContractUpdated',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'user',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'amount',
              type: 'uint256',
            },
          ],
          name: 'Staked',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'user',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'amount',
              type: 'uint256',
            },
          ],
          name: 'Unstaked',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'amount',
              type: 'uint256',
            },
          ],
          name: 'Withdrawn',
          type: 'event',
        },
        {
          inputs: [],
          name: 'MAX_STAKE',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'REQUIRED_DBRO',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'RYFT_TOKEN_ID',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'SECONDS_IN_YEAR',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'UNWRAP_FEE_PERCENT',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'user',
              type: 'address',
            },
          ],
          name: 'calculatePendingRewards',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'claimReward',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'dbroToken',
          outputs: [
            {
              internalType: 'contract IERC20',
              name: '',
              type: 'address',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'getAnnualRewardRate',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'pure',
          type: 'function',
        },
        {
          inputs: [],
          name: 'getRewardsWalletBalance',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'user',
              type: 'address',
            },
          ],
          name: 'getStakeInfoAndPendingRewards',
          outputs: [
            {
              components: [
                {
                  internalType: 'uint256',
                  name: 'amountStaked',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'startTime',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'rewardDebt',
                  type: 'uint256',
                },
              ],
              internalType: 'struct DBROWrappedStaking.StakeInfo',
              name: '',
              type: 'tuple',
            },
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'maxClaimableQuantity',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
            {
              internalType: 'uint256[]',
              name: '',
              type: 'uint256[]',
            },
            {
              internalType: 'uint256[]',
              name: '',
              type: 'uint256[]',
            },
            {
              internalType: 'bytes',
              name: '',
              type: 'bytes',
            },
          ],
          name: 'onERC1155BatchReceived',
          outputs: [
            {
              internalType: 'bytes4',
              name: '',
              type: 'bytes4',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
            {
              internalType: 'bytes',
              name: '',
              type: 'bytes',
            },
          ],
          name: 'onERC1155Received',
          outputs: [
            {
              internalType: 'bytes4',
              name: '',
              type: 'bytes4',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'owner',
          outputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'renounceOwnership',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'rewardsWallet',
          outputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'ryftContract',
          outputs: [
            {
              internalType: 'contract IDRYFT',
              name: '',
              type: 'address',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: 'amount',
              type: 'uint256',
            },
          ],
          name: 'stake',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
          ],
          name: 'stakes',
          outputs: [
            {
              internalType: 'uint256',
              name: 'amountStaked',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'startTime',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'rewardDebt',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'bytes4',
              name: 'interfaceId_',
              type: 'bytes4',
            },
          ],
          name: 'supportsInterface',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'totalRewardTokens',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'tokenContractAddress',
              type: 'address',
            },
            {
              internalType: 'address',
              name: 'dRYFTContractAddress',
              type: 'address',
            },
          ],
          name: 'totalWrappedTokens',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'newOwner',
              type: 'address',
            },
          ],
          name: 'transferOwnership',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'unstake',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: 'quantity',
              type: 'uint256',
            },
          ],
          name: 'unwrapNFT',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: 'newMaxQuantity',
              type: 'uint256',
            },
          ],
          name: 'updateMaxClaimableQuantity',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: 'newRequiredDBRO',
              type: 'uint256',
            },
          ],
          name: 'updateRequiredDBRO',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'newRewardsWallet',
              type: 'address',
            },
          ],
          name: 'updateRewardsWallet',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'newRyftContract',
              type: 'address',
            },
          ],
          name: 'updateRyftContract',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'withdrawTokens',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: 'amount',
              type: 'uint256',
            },
          ],
          name: 'wrapTokens',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ],
    },
  },
}

export default deployedContracts
