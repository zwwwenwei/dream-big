class Planet < ApplicationRecord
    #assocations
    has_one :planet_skin
    belongs_to :star_system
end
