class Star < ApplicationRecord
    #ASsocations
    has_one :star_skin
    belongs_to :star_system
end
