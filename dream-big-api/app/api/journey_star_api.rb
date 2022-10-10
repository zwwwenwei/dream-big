require 'grape'

class JourneyStarApi < Grape::API
  desc 'Allow retrieval of a single journey journey'
  get '/journey/:id' do
    parameters = ActionController::Parameters.new(params)
      .permit(
        :id
      )

 

    result = JourneyStar.find(params[:id])
    present result, with: Entities::JourneyStarEntity
  end

  desc 'Allow creation of a Journey Star'
  params do
  
    requires :isMaxed, type: Boolean, desc: 'is maxed bool'
    requires :category_id, type: Integer, desc: 'category ID assocaited with star'
    requires :student_journey_id, type: Integer, desc: 'Student Journey star associated with'
  end
  post '/journey-star' do
    parameters = ActionController::Parameters.new(params)
      .permit(
        :isMaxed,
        :category_id,

    # Auth...
    result = JourneyStar.create!(parameters) 

    present result, with: Entities::JourneyStarEntity
  end

  desc 'Allow updating of a journey star'
  params do
    
    optional :isMaxed, type: Boolean, desc: 'is maxed bool'
    optional :category_id, type: Integer, desc: 'category ID assocaited with star'
    optional :student_journey_id, type: Integer, desc: 'Student Journey star associated with'
  end
  put '/journey-star/:id' do
    parameters = ActionController::Parameters.new(params)
      .permit(
        :isMaxed,
        :category_id,
        :student_journey_id
      )

    # Auth

    result = JourneyStar.find(params[:id])
    result.update! parameters

    present result, with: Entities::JourneyStarEntity
  end

  desc 'Delete the journey star with the indicated id'
  params do
    requires :id, type: Integer, desc: 'The id of the journey star to delete'
  end
  delete '/journey-star/:id' do
    JourneyStar.find(params[:id]).destroy!
    true
  end

  desc 'Retrieve the journey star for a given student'
  params do
    # requires :student_id, type: Integer, desc: 'The id of the student to retrieve all journeys for'
  end
  get '/journey-star' do
    # result = StudentJourney.where(student_id: params[:student_id])
    result = JourneyStar.all

    present result, with: Entities::JourneyStarEntity
  end
end