module Entities
    class ReflectionsEntity < Grape::Entity
      expose :id
      expose :reflectionText
      expose :sectionID
      expose :goalID
      expose :timestamps
    end
  end