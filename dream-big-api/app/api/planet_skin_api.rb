require 'grape'

class PlanetSkinApi < Grape::API

  desc 'Allow creation of a planet skin'
  params do
  
    requires :asset, type: String, desc: 'Image url'
    requires :color type: String, desc: 'planets color'
  end
  post '/planetskin' do
    planet_skin_parameters = ActionController::Parameters.new(params)
      .permit(
        :asset,
        :color
      )

    # Auth...

    result = PlanetSkin.create!(planet_skin_parameters)

    present result, with: Entities::PlanetSkinEntity
  end

  desc 'Allow updating of a Planet Skins'
  params do
    
    optional :asset, type: String, desc: 'Image URL'
    optional :color, type: String, desc: 'Color of planet'
  end
  put '/planetskin/:id' do
    planet_skin_parameters = ActionController::Parameters.new(params)
      .permit(
        :asset,
        :color
        #Ex:- :default =>''
      )

    # Auth

    result = PlanetSkin.find(params[:id])
    result.update! planet_skin_parameters

    present result, with: Entities::PlanetSkinEntity
  end

  desc 'Delete the planet with the indicated id'
  params do
    requires :id, type: Integer, desc: 'The id of the planet to delete'
  end
  delete '/planetskin/:id' do
    PlanetSkin.find(params[:id]).destroy!
    true
  end

  get '/planetskin' do
    result = PlanetSkin.all

    present result, with: Entities::PlanetSkinEntity
  end
end