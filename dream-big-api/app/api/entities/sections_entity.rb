module Entities
    class SectionsEntity < Grape::Entity
      expose :id
      expose :planetID
      expose :categoryID
      expose :timestamps
    end
  end