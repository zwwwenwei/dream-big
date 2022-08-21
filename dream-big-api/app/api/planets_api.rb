require 'grape'

class PlanetApi < Grape::API

  desc 'Allow creation of a planet skin'
  params do
  
    requires :status, type: String, desc: 'planet status'
  end
  post '/planet' do
    planet_parameters = ActionController::Parameters.new(params)
      .permit(
        :status
      )

    # Auth...

    result = Planet.create!(planet_parameters)

    present result, with: Entities::PlanetsEntity
  end

  desc 'Allow updating of a Planet'
  params do
    
    optional :status, type: String, desc: 'Planet Status'
  end
  put '/planet/:id' do
    planet_parameters = ActionController::Parameters.new(params)
      .permit(
        :status
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

  get '/planet' do
    result = Planet.all

    present result, with: Entities::PlanetsEntity
  end
end