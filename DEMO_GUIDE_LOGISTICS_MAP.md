# Demo Guide: Warehouse & Logistics Visibility Map

## Quick Navigation
From the main dashboard, navigate to **Stakeholders** in the top menu, then scroll down to see the **Warehouse & Logistics Visibility Map** section at the bottom of the page.

## Key Demo Flow

### 1. Initial View (10 seconds)
**What to show:**
- Point out the interactive map showing the entire supply chain network
- Highlight the three types of entities visible:
  - Green/amber/red circular markers = Warehouses
  - Blue/amber/red circular markers = Processing Units
  - Colored lines = Transport routes

**What to say:**
> "Here we have a bird's-eye view of our entire logistics network across Northern India. You can see warehouses, processing facilities, and active transport routes all in one place."

### 2. Status Indicators (15 seconds)
**What to show:**
- Point to different colored markers
- Open the Legend (click "Legend" button in top-right)

**What to say:**
> "The color-coding provides instant visibility - green means operational, amber indicates maintenance, and red flags critical situations. Notice this warehouse in Maharashtra is red - that's our Pune depot running at 99% capacity."

### 3. Interactive Tooltips (30 seconds)
**What to show:**
- Click on Punjab Central Warehouse marker
- Show capacity bar, temperature, commodities
- Click on a processing unit
- Show throughput metrics and efficiency
- Click on a transport route
- Show progress bar and status

**What to say:**
> "Click any marker for detailed insights. For example, this Punjab warehouse is at 64% capacity, storing wheat, rice, and chickpea at a controlled 18°C. Our processing units show real-time throughput - this Gurgaon plant is running at 72% efficiency with 6 active batches. And transport routes? You can track them in real-time with progress indicators."

### 4. Filtering System (45 seconds)
**What to show:**
- Click "Filters" button
- Show layer visibility toggles with counts
- Toggle off Processing Units - watch markers disappear
- Toggle back on
- Select "wheat" commodity filter
- Show how map updates to only wheat-related entities
- Select "delayed" status filter
- Point out the highlighted delayed shipment

**What to say:**
> "The filtering system helps stakeholders focus on what matters. Toggle layers on and off to reduce clutter. Filter by specific commodities - let's look at just wheat operations. Or filter by status - here's our delayed shipment from Jaipur to Lucknow that needs attention. You can combine filters too."

### 5. Transport Route Deep Dive (20 seconds)
**What to show:**
- Clear all filters
- Click on the green "Punjab to Delhi Express" route
- Show the detailed popup with origin, destination, distance, progress

**What to say:**
> "Transport routes show the complete journey. This shipment is 68% complete, covering 320km from our Punjab warehouse to Delhi. We can see it's carrying wheat, traveling by truck TRK-114, with an estimated 6-hour transit time. Green means it's on schedule."

### 6. Delayed Shipment Example (20 seconds)
**What to show:**
- Find and click the red "Jaipur to Lucknow Corridor" route
- Point out the red color and 35% progress

**What to say:**
> "This red route shows a delayed shipment. It's only 35% complete on a 12-hour journey - our operations team can immediately identify this and take corrective action, perhaps notifying the buyer or arranging alternative logistics."

### 7. Capacity Management (25 seconds)
**What to show:**
- Click Maharashtra South Depot (the red marker near Pune)
- Show 99% capacity utilization (4450/4500 MT)
- Point out the red capacity bar

**What to say:**
> "Capacity management is critical. This Pune depot is in red because it's at 99% capacity - only 50 metric tons available. This triggers alerts for procurement teams to either move inventory out or halt incoming shipments. Real-time visibility prevents costly overruns."

### 8. Stakeholder-Specific Value (30 seconds)
**What to show:**
- Scroll up to show the role tabs (Farmer, FPO, Processor, Retailer)
- Click between different roles
- Show how the map remains consistent while other dashboard sections change

**What to say:**
> "The beauty of this system is that it serves all stakeholders. A farmer can see where their harvest is being stored and processed. An FPO manager can track outbound shipments and warehouse availability. Processors can monitor incoming raw materials. Retailers can follow finished goods to their distribution centers. Everyone gets the same accurate, real-time geospatial data."

### 9. Business Impact Summary (20 seconds)
**What to say:**
> "This map reduces blind spots in the supply chain. Stakeholders make faster decisions, avoid capacity bottlenecks, respond to delays proactively, and optimize their logistics network. It's transparency that builds trust and drives efficiency."

## Key Talking Points

### For Farmers:
- "See exactly where your produce is stored and when it's being shipped"
- "Know which processing facilities are operating efficiently"
- "Track your deliveries in real-time"

### For FPOs:
- "Optimize aggregation based on warehouse availability"
- "Coordinate pickups with visible transport capacity"
- "Monitor temperature and storage conditions remotely"

### For Processors:
- "Track incoming raw material shipments"
- "Plan production based on transport delays"
- "Optimize delivery schedules to retailers"

### For Retailers:
- "Visibility into entire upstream supply chain"
- "Anticipate delays and adjust store inventory"
- "Coordinate replenishment with DC capacity"

## Technical Highlights (for technical stakeholders)

- Built with Leaflet.js and React-Leaflet
- Fully responsive and performant with 10+ markers and routes
- Filter state management with React hooks
- Custom SVG icons for marker differentiation
- Polyline rendering with waypoints for accurate route visualization
- Memoized filtering for optimal performance
- Reusable component architecture

## Common Demo Pitfalls to Avoid

1. **Don't rush the initial view** - Let people absorb the visual for 5 seconds
2. **Don't forget to open tooltips** - The detail view is where the magic happens
3. **Don't skip the filters** - They show how the system scales with complexity
4. **Don't miss the delayed shipment** - It's the best example of actionable intelligence
5. **Don't forget to mention scalability** - "This works with 6 warehouses or 600"

## Follow-up Questions & Answers

**Q: Is this real-time data?**
A: "This demo uses seeded data, but the architecture supports real-time updates via WebSocket or polling. In production, you'd see live GPS tracking and instant status changes."

**Q: Can we integrate with our existing systems?**
A: "Absolutely. The map component consumes standard JSON data with lat/lng coordinates. We can connect to your WMS, TMS, or ERP systems via API."

**Q: What about mobile devices?**
A: "The map is fully responsive. On mobile, users get the same functionality with touch-optimized controls and simplified filter panels."

**Q: Can we export or share this view?**
A: "The current version supports screenshot sharing. We can add PDF export, shareable links, or embeddable widgets in the next iteration."

**Q: How does this help with weather-related delays?**
A: "Great question! Notice the weather alerts section above the map - those logistics alerts correlate with the map view. In the next version, we can overlay weather patterns directly on the map."

## Time Estimates

- Quick overview: 2 minutes
- Standard demo: 5 minutes
- Detailed walkthrough: 10 minutes
- Q&A included: 15 minutes

## Best Practices

1. **Start zoomed out** - Show the big picture first
2. **Use the filters strategically** - Don't filter everything at once
3. **Tell a story** - Follow one shipment from warehouse to destination
4. **Connect to pain points** - "Remember when that shipment got stuck? Now you'd see it immediately."
5. **End with impact** - Quantify the value (e.g., "30% reduction in delay response time")
