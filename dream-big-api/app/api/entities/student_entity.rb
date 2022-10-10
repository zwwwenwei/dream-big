module Entities
  class StudentEntity < Grape::Entity
    expose :id
    expose :firstName
    expose :lastName
    expose :phone
    expose :address
    expose :student_type 
    expose :avatar_id
    expose :user_id
  end
end
