defmodule Jukee.TrackSearch do
  alias Jukee.TrackSearch
  alias Jukee.TrackMapping
  
  defstruct title: nil, provider: nil, external_id: nil, channel_title: nil, thumbnail: nil
  
  def search_youtube_by_query(query) do
    case Tubex.Video.search_by_query(query) do
      {:ok, results, response} ->
        Enum.map(results, fn result -> %Jukee.TrackSearch{
          title: result.title,
          provider: "youtube",
          external_id: result.video_id,
          channel_title: result.channel_title,
          thumbnail: Map.get(Map.get(result.thumbnails, "default"), "url")
        } end)
      err -> err
    end
  end

  def get_track(%{"provider" => provider, "externalId" => external_id}) do
    case provider do
      "youtube" ->
        get_youtube_track(external_id)
    end
  end

  def get_youtube_track(external_id) do
    case Tubex.Video.detail(external_id, [part: "snippet,contentDetails"]) do
      response ->
        item = List.first(Map.get(response, "items"))
        TrackMapping.map_youtube_track(item)
      err -> err
    end
  end
end