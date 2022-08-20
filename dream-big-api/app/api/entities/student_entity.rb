module Entities
    class StudentEntity < Grape::Entity
      expose :id
      expose :studentName
      expose :Phone
      expose :address
      expose :type  
    end
  end