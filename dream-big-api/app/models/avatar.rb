class Avatar < ApplicationRecord
    #associations
    has_one :avatar_hairs
    has_one :avatar_accessories
    has_one :avatar_heads
    has_one :avatar_torsos
end
