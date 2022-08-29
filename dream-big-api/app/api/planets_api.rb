require 'grape'

class PlanetsApi < Grape::API

  desc 'Allow creation of a planet skin'
  params do
  
    requires :status, type: String, desc: 'planet status'
    requires :star_system_id, type: Integer, desc: 'the id for the star system this planet belongs to'
  end
  post '/planet' do
    planet_parameters = ActionController::Parameters.new(params)
      .permit(
        :status,
        :star_system_id
      )

    # Auth...

    result = Planet.create!(planet_parameters)

    present result, with: Entities::PlanetsEntity
  end

  desc 'Allow updating of a Planet'
  params do
    
    requires :star_system_id, type: Integer, desc: 'the id for the star system this planet belongs to'
    optional :status, type: String, desc: 'Planet Status'
  end
  put '/planet/:id' do
    planet_parameters = ActionController::Parameters.new(params)
      .permit(
        :status,
        :star_system_id
        #Ex:- :default =>''
      )

    # Auth

    result = Planet.find(params[:id])
    result.update! planet_parameters

    present result, with: Entities::PlanetsEntity
  end

  desc 'Delete the planet with the indicated id'
  params do
    requires :id, type: Integer, desc: 'The id of the planet to delete'
  end
  delete '/planet/:id' do
    Planet.find(params[:id]).destroy!
    true
  end

  desc 'Get all planets with the indicated star_system_id'
  params do
    requires :star_system_id, type: Integer, desc: 'The id of the star_system'
  end
  get '/planet' do
    result = Planet.where(star_system_id: params[:star_system_id])

    present result, with: Entities::PlanetsEntity
  end
end