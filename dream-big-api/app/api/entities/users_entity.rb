module Entities
    class UsersEntity < Grape::Entity
      expose :id
      expose :username
      expose :name
      expose :email
      expose :password
    end
  end