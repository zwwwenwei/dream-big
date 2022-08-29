class Student < ApplicationRecord
  #assocations
  belongs_to :user
  has_one :student_journey
end
