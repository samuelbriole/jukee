defmodule JukeeWeb.RoomView do
  use JukeeWeb, :view
  alias JukeeWeb.RoomView

  def render("index.json", %{rooms: rooms}) do
    %{data: render_many(rooms, RoomView, "room.json")}
  end

  def render("show.json", %{room: room}) do
    %{data: render_one(room, RoomView, "room_with_player_id.json")}
  end

  def render("room.json", %{room: room}) do
    %{id: room.id,
      url: room.url,
    }
  end

  def render("room_with_player_id.json", %{room: room}) do
    %{id: room.id,
      url: room.url,
      playerId: room.player.id}
  end
end
