class Student < ApplicationRecord
    #assocations
    belongs_to: users
    has_one: student_journey
end
