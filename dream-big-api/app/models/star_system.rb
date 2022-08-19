class StarSystem < ApplicationRecord

    #Assocations
    has_many :planets
    has_one :star
    belongs_to :student_journey
end
