class StudentJourney < ApplicationRecord
    #Associations
    belongs_to :student
    # has_many :star_systems
    # has_one :journey_stars
end
