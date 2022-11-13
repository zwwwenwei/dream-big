class Section < ApplicationRecord
     #assocations
  belongs_to :planets
  has_many :goals
  has_many :plans
  

end
